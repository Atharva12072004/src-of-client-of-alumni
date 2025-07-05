import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { alumniEps } from "../../utils/AdminPanel/endpoints";
import { fetcherGet } from "../../utils/axiosAPI";
import { Stack, Typography, Box, CircularProgress } from "@mui/material";
import UserDeleteCard from "../../components/AdminPanel/UserDeleteCard";

const UserHandle = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    const url = alumniEps?.user?.getAll;
    try {
      const res = await fetcherGet(url);
      setAllUsers(res);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", padding: "1.5rem" }}>
        <Stack spacing={3}>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h4">Users</Typography>
          </Stack>
          {loading ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={1}
              height={100}
            >
              <CircularProgress size={"2.5rem"} />
            </Stack>
          ) : allUsers?.length === 0 ? (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              width={1}
              height={100}
            >
              <Typography variant="h5" fontWeight={600}>
                No Users
              </Typography>
            </Stack>
          ) : (
            <Stack spacing={3}>
              {allUsers?.map((item) => {
                if (item.rank !== 0) {
                  return (
                    <UserDeleteCard
                      key={item.userID}
                      userId={item.userID}
                      imageSrc={item.profilePicURL}
                      name={item.name}
                      rank={item.rank}
                      batch={item.batch}
                      branch={item.branch}
                      position={item.position}
                      company={item.companyName}
                      getAllUsers={getAllUsers}
                    />
                  );
                }
                return null;
              })}
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default UserHandle;
