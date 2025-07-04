import React, { useState } from "react";
import {
  Stack,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";
import { fetcherPost } from "../../utils/axiosAPI";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../store/atoms/User";
import { alumniEps } from "../../utils/AdminPanel/endpoints";

const loginValidationSchema = yup.object({
  password: yup.string().required("Password is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const AdminLogin = () => {
  const [show, setShow] = useState({
    password: false,
  });
  const setUser = useSetRecoilState(userAtom);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      const url = alumniEps?.user?.login;
      const body = {
        rank: 0,
        email: values.email,
        password: values.password,
      };
      try {
        const response = await fetcherPost(url, { body });
        if (response?.msg === "Logged In Successfully") {
          const userId = response.userID;
          const token = response.token;

          localStorage.setItem("token", token);

          const body = {
            userID: userId,
          };

          const userDetails = await fetcherPost("/user/get", { body });
          setUser((prevData) => ({
            ...prevData,
            basic: {
              ...prevData.basic,
              isLoggedIn: true,
              email: userDetails.email,
              rank: userDetails.rank,
              id: response.userID,
              name: userDetails.name,
            },
            profilePic: userDetails.profilePicURL,
            socials: {
              githubUrl: userDetails.githubURL,
              linkedInUrl: userDetails.linkedinURL,
              xUrl: userDetails.xURL,
            },
            notifications: userDetails.notifications,
            collegeDetails: {
              branch: userDetails.branch,
              batch: userDetails.batch,
            },
            jobRelated: {
              company: userDetails.companyName,
              jobTitle: userDetails.position,
            },
          }));
          toast.success("Logged in successfully");
        } else {
          toast.error(response?.msg);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      width={1}
      height={"100vh"}
      spacing={2}
    >
      <img
        src={"/logo.png"}
        className={`overflow-hidden transition-all w-36`}
        alt="AlmaMater"
      />
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3} sx={{ px: 1 }}>
          <FormControl fullWidth>
            <TextField
              size="small"
              label={"Email"}
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
          <Button
            disabled={formik.isSubmitting}
            variant="contained"
            size="large"
            type="submit"
          >
            LOGIN
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default AdminLogin;
