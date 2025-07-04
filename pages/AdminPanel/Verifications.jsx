import React from "react";
import { useState, useEffect } from "react";
import { fetcherGet } from "../../utils/axiosAPI";
import VerifyCard from "../../components/AdminPanel/VerifyCard";
import { toast } from "react-toastify";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { alumniEps } from "../../utils/AdminPanel/endpoints";

const Verifications = () => {
  const [pendingData, setPendingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const url = alumniEps?.verification?.getAll;
    try {
      const res = await fetcherGet(url);
      setPendingData(res);
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box sx={{ width: "100%", padding: "1.5rem" }}>
        {loading ? (
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={1}
            height={100}
          >
            <CircularProgress size={"2.5rem"} />
          </Stack>
        ) : pendingData?.length === 0 ? (
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            width={1}
            height={100}
          >
            <Typography variant="h5" fontWeight={600}>
              No Alumni Approvals Pending
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={3}>
            {pendingData?.map((item) => (
              <VerifyCard
                key={item.userID}
                name={item.name}
                email={item.email}
                id={item.userID}
                linkedin={item.linkedinURL}
                refreshData={getData}
              />
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Verifications;
