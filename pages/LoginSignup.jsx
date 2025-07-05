import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Stack,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
  MenuItem,
  FormHelperText,
  Tabs,
  Tab,
  Divider,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import {fetcherPost} from "../utils/axiosAPI";
import {toast} from 'react-toastify';
import {useSetRecoilState} from "recoil";
import {userAtom} from "../store/atoms/User";

const signupValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required"),
//    .matches(
//      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
//      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
//    ),
//  usertype: yup.string().required("User Type is required"),
  confirm: yup
    .string()
    .required("Confirm Password is required")
    .test(
      "confirm",
      `Passwords don't match`,
      (confirm, Yup) => Yup.parent.password === confirm
    ),
  name: yup.string().required("Name is required"),
  email: yup.string().when("usertype", {
    is: "student",
    then: (schema) =>
      schema
        .email("Enter a valid Email")
        .required("Email is required")
        .matches(
          /.+@acpce\.ac\.in$/,
          "College Emails must end with @acpce.ac.in"
        ),
    otherwise: (schema) =>
      schema.email("Enter a valid Email").required("Email is required"),
  }),
});

const loginValidationSchema = yup.object({
  password: yup.string().required("Password is required"),
  usertype: yup.string().required("User Type is required"),
  email: yup.string().when("usertype", {
    is: "student",
    then: (schema) =>
      schema
        .email("Enter a valid Email")
        .required("Email is required")
        .matches(
          /.+@acpce\.ac\.in$/,
          "College Emails must end with @acpce.ac.in"
        ),
    otherwise: (schema) =>
      schema.email("Enter a valid Email").required("Email is required"),
  }),
});

const ranks = {
  admin: 0,
  alumni: 1,
  student: 2,
  outsider: 3,
};

const LoginSignup = ({
  open = true,
  handleClose,
  type = "login",
  callToast,
}) => {
  const [show, setShow] = useState({
    password: false,
    confirm: false,
  });
  const [currentTab, setCurrentTab] = useState(() => {
    if (type === "login") return 0;
    else return 1;
  });
  const [dialogContent, setDialogContent] = useState("login");
  const setUser = useSetRecoilState(userAtom);
  const [signupEmail, setSignupEmail] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      usertype: "",
      confirm: "",
      linkedinURL: "",
    },
    validationSchema:
      currentTab === 0 ? loginValidationSchema : signupValidationSchema,
    onSubmit: async (values) => {
      if (currentTab === 0) {
        const url = "/user/login";
        const body = {
          rank: ranks[values.usertype],
          email: values.email,
          password: values.password,
        };
        try {
          const response = await fetcherPost(url, { body });
          if (response?.msg === "Logged In Successfully") {
            const userId = response.userID;
            const token= response.token;

            localStorage.setItem('token', token);

            const body={
              userID: userId
            }

            const userDetails = await fetcherPost('user/get', {body})
            console.log('User details: ', userDetails);
            setUser((prevData) => ({
              ...prevData,
              basic: {
                ...prevData.basic,
                isLoggedIn: true,
                email: userDetails.email,
                rank: userDetails.rank,
                id: response.userID,
                name: userDetails.name
              },
              profilePic: userDetails.profilePicURL,
              socials: {
                githubUrl: userDetails.githubURL,
                linkedinUrl: userDetails.linkedinURL,
                xUrl: userDetails.xURL
              },
              notifications: userDetails.notifications,
              collegeDetails: {
                branch: userDetails.branch,
                batch: userDetails.batch
            },
            jobRelated: {
                company: userDetails.companyName,
                jobTitle: userDetails.position,
            }
            }))
            toast.success('Logged in successfully');
            handleDialogClose();
            localStorage.setItem("token", response?.token);
          } else {
            toast.error(response?.msg);
          }
          // console.log('Response', response);
        } catch (error) {
          toast.error(error)
          // console.log(error);
        }
      } else {
        const url = "/user/signup";
        let body = {
          rank: ranks[values.usertype],
          email: values.email,
          password: values.password,
          name: values.name,
        };
        if (values.usertype === "alumni") {
          body = { ...body, linkedinURL: values.linkedinURL };
        }
        try {
          const response = await fetcherPost(url, { body });
          callToast(response?.msg);
          if (response?.msg === "OTP Sent Successfully.") {
            setSignupEmail(values.email);
            setDialogContent("otp");
          }
        } catch (err) {
          console.log("Error while login/signup: ", err);
        }
      }
    },
  });

  const otpFormik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: yup.object().shape({
      otp: yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const url = "/user/signup/verify";
      const body = {
        rank: ranks[formik.values.usertype],
        email: signupEmail,
        password: formik.values.password,
        name: formik.values.name,
        linkedinURL: formik.values.linkedinURL,
        otpAttempt: values.otp.toString(),
      };
      try {
        const response = await fetcherPost(url, { body });
        const successMsgs = [
          "User Created Successfully",
          "Admin Created Successfully",
          "Account Info Sent to Admin. Wait for Verification."
        ];
        const errorMsgs = [
          "Incorrect OTP.",
          "OTP Expired or Wrong E-Mail."
        ];
        if (successMsgs.includes(response?.msg)) {
          toast.success(response.msg);
          handleDialogClose();
          setDialogContent("login");
        } else if (errorMsgs.includes(response?.msg)) {
          toast.error("Invalid OTP Entered");
          // Do not close dialog
        } else {
          toast.error(response?.msg || "Something went wrong");
          // Do not close dialog
        }
      } catch (err) {
        toast.error("Invalid OTP Entered");
        // Do not close dialog
      }
    },
  });

  useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line
  }, [currentTab]);

  useEffect(() => {
    // Set inert on the main content when login/signup dialog is open
    const mainContent = document.getElementById("root");
    if (open && mainContent) {
      mainContent.setAttribute("inert", "true");
    } else if (mainContent) {
      mainContent.removeAttribute("inert");
    }
    return () => {
      if (mainContent) mainContent.removeAttribute("inert");
    };
  }, [open]);

  const handleDialogClose = () => {
    handleClose();
    formik.resetForm();
  };

  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab);
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <Stack
        sx={{ mr: 3, mt: 2 }}
        direction="row"
        justifyContent="end"
        alignContent="center"
      >
        <IconButton onClick={handleDialogClose}>
          <Close />
        </IconButton>
      </Stack>
      {dialogContent === "login" ? (
        <>
          <Stack sx={{ mb: 3 }}>
            <Tabs value={currentTab} onChange={handleTabChange} centered>
              <Tab label="Login" />
              <Tab label="Signup" />
            </Tabs>
            <Divider />
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <DialogContent
              sx={{ width: { xs: "260px", md: "450px" }, pt: 1, pb: 4 }}
            >
              <Stack spacing={3} sx={{ px: 1 }}>
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    select
                    label="Select User Type"
                    value={formik.values.usertype}
                    onChange={(event) =>
                      formik.setFieldValue("usertype", event.target.value)
                    }
                  >
                    <MenuItem value={"outsider"}>Outsider</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                    <MenuItem value={"alumni"}>Alumni</MenuItem>
                  </TextField>
                  {formik.touched.usertype && formik.errors.usertype && (
                    <FormHelperText error id="usertype-helper">
                      {formik.errors.usertype}
                    </FormHelperText>
                  )}
                </FormControl>
                {currentTab === 1 && (
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="Name"
                      value={formik.values.name}
                      onChange={(event) =>
                        formik.setFieldValue("name", event.target.value)
                      }
                    />
                    {formik.touched.name && formik.errors.name && (
                      <FormHelperText error id="name-helper">
                        {formik.errors.name}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <FormControl fullWidth>
                  <TextField
                    size="small"
                    label={
                      formik.values.usertype === "student"
                        ? "College Email"
                        : "Email"
                    }
                    value={formik.values.email}
                    onChange={(event) =>
                      formik.setFieldValue("email", event.target.value)
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <FormHelperText error id="email-helper">
                      {formik.errors.email}
                    </FormHelperText>
                  )}
                </FormControl>
                {currentTab === 1 && formik.values.usertype === "alumni" && (
                  <FormControl fullWidth>
                    <TextField
                      size="small"
                      label="LinkedIn URL"
                      value={formik.values.linkedinURL}
                      onChange={(event) =>
                        formik.setFieldValue("linkedinURL", event.target.value)
                      }
                    />
                    {formik.touched.linkedinURL && formik.errors.linkedinURL && (
                      <FormHelperText error id="alumni-desc-helper">
                        {formik.errors.linkedinURL}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    type={show.password ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShow((old) => ({
                                ...show,
                                password: !old.password,
                              }))
                            }
                            edge="end"
                          >
                            {show.password ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={formik.values.password}
                    onChange={(event) =>
                      formik.setFieldValue("password", event.target.value)
                    }
                  />
                  {formik.touched.password && formik.errors.password && (
                    <FormHelperText error id="password-helper">
                      {formik.errors.password}
                    </FormHelperText>
                  )}
                </FormControl>
                {currentTab === 1 && (
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      size="small"
                      label="Confirm Password"
                      type={show.confirm ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShow((old) => ({
                                  ...show,
                                  confirm: !old.confirm,
                                }))
                              }
                              edge="end"
                            >
                              {show.confirm ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={formik.values.confirm}
                      onChange={(event) =>
                        formik.setFieldValue("confirm", event.target.value)
                      }
                    />
                    {formik.touched.confirm && formik.errors.confirm && (
                      <FormHelperText error id="confirm-helper">
                        {formik.errors.confirm}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
                <Button
                  disabled={formik.isSubmitting}
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  {currentTab === 0 ? "LOGIN" : "SIGNUP"}
                </Button>
              </Stack>
            </DialogContent>
          </form>
        </>
      ) : (
        <form onSubmit={otpFormik.handleSubmit}>
          <DialogContent
            sx={{
              width: '100%',
              maxWidth: 400,
              pt: 1,
              pb: 4,
              overflowX: 'hidden',
            }}
          >
            <Stack spacing={2}>
              <Typography variant="h5">OTP Verification</Typography>
              {signupEmail && (
                <Typography variant="body2" sx={{ textAlign: 'center', color: 'gray' }}>
                  Email: {signupEmail}
                </Typography>
              )}
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Enter OTP"
                  value={otpFormik.values.otp}
                  onChange={(event) =>
                    otpFormik.setFieldValue("otp", event.target.value)
                  }
                  inputProps={{ style: { textAlign: 'center', fontSize: 18, letterSpacing: 4 } }}
                />
                {otpFormik.touched.otp && otpFormik.errors.otp && (
                  <FormHelperText error id="otp-helper">
                    {otpFormik.errors.otp}
                  </FormHelperText>
                )}
              </FormControl>
              <Stack justifyContent="center" alignContent="center" sx={{ mt: 1 }}>
                <Button
                  disabled={otpFormik.isSubmitting}
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{ width: { xs: '100%', sm: '60%' }, alignSelf: 'center', fontSize: 18, py: 1.5 }}
                >
                  VERIFY
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </form>
      )}
    </Dialog>
  );
};

export default LoginSignup;
