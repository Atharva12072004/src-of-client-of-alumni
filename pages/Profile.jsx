import { useState, useEffect, useRef } from "react";
import Navbar from "../template/Navbar";
import { BorderButton } from "../components/Buttons";
import { Detail } from "../components/ProfileDetail";
import Notification from "../components/Notification";
import Footer from "../template/Footer";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRecoilValue, useSetRecoilState} from "recoil";
import { userAtom } from "../store/atoms/User";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  DialogTitle,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { Close, NotificationsNone } from "@mui/icons-material";
import { fetcherPost, fetcherPut } from "../utils/axiosAPI";
import {useLocation, useNavigate} from "react-router-dom";
import { px } from "framer-motion";

// const sample = {
//   _id: 223123213,
//   position: "Software Engineer",
//   company: "Walmart",
//   email: "johndoe@hotmail.com",
//   batch: 2020,
//   branch: "Computer Science and Engineering",
// };

// const sampleNotifications = [
//   {
//     id: 1,
//     type: "REQUEST",
//     text: ""
//   },
//   {
//     id: 2,
//     type: "NORMAL",
//     text: ""
//   },
//   {
//     id: 3,
//     type: "REQUEST",
//     text: ""
//   }
// ];

const Profile = () => {
  const [data, setData] = useState(null);
  const user = useRecoilValue(userAtom);
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editData, setEditData] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const fileInputRef = useRef();
  const navigate=useNavigate();
  const setUser = useSetRecoilState(userAtom);
  //const backendBaseUrl = "http://localhost:5000";
  const backendBaseUrl = "https://server-alumni.onrender.com";

//  const location = useLocation();
//  const queryParams = new URLSearchParams(location.search);
//  const viewUserId = queryParams.get("view");

  const getUserProfileData = async (userID) => {
    setLoading(true);
    try {
      const url = "/user/get";
      const body = { userID: userID };
      const response = await fetcherPost(url, { body });
      setData(response);

      console.log(response);

      setEditData({
        position: response?.position || "",
        branch: response?.branch || "",
        batch: response?.batch || "",
        companyName: response?.companyName || "",
        email: response?.email || "",
        name: response?.name || "",
        userID: user?.basic?.id,
        profilePicURL: response?.profilePicURL || "",
        jobLocation: response?.jobLocation || "",
        linkedinURL: response?.linkedinURL || "",
        githubURL: response?.githubURL || "",
        xURL: response?.xURL || "",
      });
    } catch (error) {
      console.log("Error in getting user details: ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    //console.log("User: ", user);
      if (user?.basic?.id) getUserProfileData(user.basic.id);
  }, [user]);

  useEffect(() => {
    // Set inert on the main content when edit dialog is open
    const mainContent = document.getElementById("root");
    if (editOpen && mainContent) {
      mainContent.setAttribute("inert", "true");
    } else if (mainContent) {
      mainContent.removeAttribute("inert");
    }
    return () => {
      if (mainContent) mainContent.removeAttribute("inert");
    };
  }, [editOpen]);

  const handleDetailChange = (title, value) => {
    setEditData((prevdata) => ({ ...prevdata, [title]: value }));
  };

  const handleEditFormOpen = () => {
    setEditOpen(true);
  };

  const handleEditFormClose = () => {
    setEditOpen(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
    setProfilePicPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleProfilePicUpload = async () => {
    if (!profilePicFile) return null;
    const formData = new FormData();
    formData.append("image", profilePicFile);
    formData.append("userID", user?.basic?.id);
    formData.append("title", "profile-pic");
    formData.append("date", new Date().toISOString());
    try {
      const res = await fetch("https://server-alumni.onrender.com/api/images/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      // Return the image URL from the backend response
      return data.image?.url;
    } catch (err) {
      toast.error("Failed to upload image");
      return null;
    }
  };

  const handleSaveClick = async () => {
    setSubmitting(true);
    let profilePicURL = editData?.profilePicURL;
    if (profilePicFile) {
      const uploadedUrl = await handleProfilePicUpload();
      if (uploadedUrl) profilePicURL = uploadedUrl;
    }
    try {
      const url = "/user/edit";
      const body = {
        ...editData,
        profilePicURL,
      };
      console.log(body);
      const res = await fetcherPut(url, {
        token: localStorage.getItem("token"),
        body,
      });
      if (res?.UpdatedUser) {
        toast.success("Profile Updated Successfully");
        setData(res.UpdatedUser);
        handleEditFormClose();
      }
    } catch (error) {
      console.log("Error in updating user details: ", error);
    }
    setSubmitting(false);
  };

  const handleLogout =() =>{
    setUser({
      basic: {
        name: '',
        email: '',
        rank: -1,
        isLoggedIn: false
      },
      profilePic: '',
      socials: {
        githubUrl: '',
        linkedInUrl: '',
        xUrl: ''
      },
      notifications:[],
      address: {
        city: '',
        state: ''
      },
      activity: {
        projectsFloated: 0,
        jobsFloated: 0,
        internshipsFloated: 0
      },
      collegeDetails: {
        branch: '',
        batch: ''
      },
      jobRelated: {
        company: '',
        jobTitle: '',
      }
    })
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <Navbar />
      {loading ? (
        <p className=" text-primaryPink font-bold font-poppins text-3xl px-6 py-4 ">
          Loading...
        </p>
      ) : (
        <>
          <div className="relative">
            <div className="overflow-auto md:overflow-hidden h-auto md:h-[250px] lg:h-[350px] 2xl:h-[450px]">
              <img
                src="/IIITDWD.svg"
                alt="cover-img"
                className="w-full object-cover relative top-0 md:-top-[6em] -z-[1]"
              />
            </div>
            <Stack spacing={1}
                   direction={'row'}>
              <div className="absolute bottom-0 right-28"
                   onClick={handleEditFormOpen}>
                <BorderButton name={"Edit Profile"} />
              </div>
              <div className="absolute bottom-2 right-2">
                <Button color={'secondary'} variant={'contained'} onClick={handleLogout}>
                  LogOut
                </Button>
              </div>
            </Stack>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="relative flex flex-col items-center md:w-[37%] lg:w-[30%] bg-[#d9d9d9]/40 gap-16 px-8">
              <div className="absolute -top-16 sm:-top-20 lg:-top-28 xl:-top-32 left-8 sm:left-auto overflow-hidden rounded-full size-32 sm:size-40 lg:size-52 xl:size-60 bg-gray-300 flex justify-center items-center">
                <img
                  src={data?.profilePicURL && data.profilePicURL.startsWith('/uploads/') ? `${backendBaseUrl}${data.profilePicURL}` : (data?.profilePicURL || "/blank-profile-picture.webp")}
                  alt="profile-img"
                  className="w-full object-cover"
                />
              </div>

              <div className="flex flex-col items-center gap-8 pt-28 md:pt-36">
                <div className="flex gap-1 items-center">
                  <img src="/location-icon.svg" alt="" />
                  <p className="text-base lg:text-xl font-poppins">
                    {data?.jobLocation}
                  </p>
                </div>
                <div className="flex justify-center gap-8 items-center w-full">
                  <a
                    href={data?.githubURL ? data.githubURL : "https://github.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/github.svg" alt="github-icon" width="35px" height="35px"/>
                  </a>
                  <a
                    href={data?.xURL ? data.xURL : "https://x.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/twittor.svg" alt="X-icon" width="35px" height="35px"/>
                  </a>
                  <a
                    href={data?.linkedinURL ? data.linkedinURL : "https://linkedin.com/"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/linkedin.svg" alt="linkedin-icon" width="35px" height="35px"/>
                  </a>
                </div>
              </div>
              <div className="">{/* Projects floated section */}</div>
            </div>

            <div className="flex flex-col gap-14 px-8 pt-6 pb-40 bg-primaryBackground md:w-[63%] lg:w-[70%]">
              <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 lg:items-center">
                <p className="font-poppins text-3xl xl:text-4xl">
                  {data?.name}
                </p>
                {data?.rank === 1 && (
                  <div className="flex gap-3">
                    <div className="px-5 sm:px-7 py-2 bg-[#F5DEE7] border-2 border-[#FA005E] rounded-3xl text-xs sm:text-sm font-bold h-fit">
                      Alumni
                    </div>
                    <div className="px-5 sm:px-7 py-2 bg-[#D9EFD3] border-2 border-[#3ACC16] rounded-3xl text-xs sm:text-sm font-bold text-center h-fit">
                      Open for Mentorship
                    </div>
                  </div>
                )}
                {data?.rank === 2 && (
                  <div className="px-5 sm:px-7 py-2 bg-[#F5DEE7] border-2 border-[#FA005E] rounded-3xl text-xs sm:text-sm font-bold h-fit">
                    Student
                  </div>
                )}
              </div>

              {/* Details and notifications */}
              <div className="flex flex-col xl:flex-row gap-10 xl:gap-5 2xl:gap-14">
                <div className="flex flex-col gap-3">
                  <Detail type={"Position"} detail={data?.position} />
                  <Detail type={"Company"} detail={data?.companyName} />
                  <Detail type={"Email"} detail={data?.email} />
                  <Detail type={"Batch"} detail={data?.batch} />
                  <Detail type={"Branch"} detail={data?.branch} />
                </div>

                <div className="border border-solid border-black/20"></div>

                <div className="flex flex-col gap-6 h-[350px] px-3 pt-2 pb-5 overflow-y-auto w-fit">
                  <div className="flex flex-row gap-1">
                    <p className="font-poppins text-lg text-black/60">
                      Notifications
                    </p>
                    <NotificationsNone className="text-black/60" />
                  </div>
                  {data?.notifications?.map((item) => (
                    <Notification
                      key={item._id}
                      type={item.type}
                      text={item.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />

      <Dialog
        open={editOpen}
        onClose={handleEditFormClose}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>
          <Stack
            direction="row"
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">Edit Profile Details</Typography>
            <IconButton onClick={handleEditFormClose}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 3 }}
            width={"100%"}
            sx={{ paddingTop: "15px" }}
          >
            <Stack spacing={2} width={{ xs: "100%", md: "50%" }}>
              {/* Profile Picture Upload */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <img
                  src={profilePicPreview || (editData?.profilePicURL && editData.profilePicURL.startsWith('/uploads/') ? `${backendBaseUrl}${editData.profilePicURL}` : (editData?.profilePicURL || "/blank-profile-picture.webp"))}
                  alt="profile-pic-preview"
                  style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", marginBottom: 8 }}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current.click()}
                  disabled={submitting}
                  sx={{ mb: 1 }}
                >
                  Change Profile Picture
                </Button>
              </div>
              {/* End Profile Picture Upload */}
              <TextField
                fullWidth
                label="Name"
                value={editData?.name}
                onChange={(e) => handleDetailChange("name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Position"
                value={editData?.position}
                onChange={(e) => handleDetailChange("position", e.target.value)}
              />
              <TextField
                fullWidth
                label="Company"
                value={editData?.companyName}
                onChange={(e) =>
                  handleDetailChange("companyName", e.target.value)
                }
              />
              <TextField
                fullWidth
                label="LinkedIn URL"
                value={editData?.linkedinURL}
                onChange={(e) => handleDetailChange("linkedinURL", e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="GitHub URL"
                value={editData?.githubURL}
                onChange={(e) => handleDetailChange("githubURL", e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="X (Twitter) URL"
                value={editData?.xURL}
                onChange={(e) => handleDetailChange("xURL", e.target.value)}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Job Location"
                value={editData?.jobLocation}
                onChange={(e) => handleDetailChange("jobLocation", e.target.value)}
              />
            </Stack>
            <Stack spacing={2} width={{ xs: "100%", md: "50%" }}>
              <TextField
                fullWidth
                label="Email"
                value={editData?.email}
                onChange={(e) => handleDetailChange("email", e.target.value)}
              />
              <TextField
                fullWidth
                label="Batch"
                value={editData?.batch}
                onChange={(e) => handleDetailChange("batch", e.target.value)}
              />
              <TextField
                fullWidth
                label="Branch"
                value={editData?.branch}
                onChange={(e) => handleDetailChange("branch", e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#FA005E",
                  color: "white",
                  height: "50px",
                  fontWeight: 500,
                  fontSize: "1em",
                }}
                disabled={submitting}
                onClick={handleSaveClick}
              >
                SAVE
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
