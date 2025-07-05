import React, { useState } from "react";
import { Typography, Stack, Box, Button, Link, Paper } from "@mui/material";
import { Email, LinkedIn } from "@mui/icons-material";
// import { fetcherGet } from "../../utils/axiosAPI";
import { fetcherPut, fetcherPost } from "../../utils/axiosAPI";
import { alumniEps } from "../../utils/AdminPanel/endpoints";
import VerifyConfirmDialog from "./Dialogs/VerfiyConfirmDialog";
import { toast } from "react-toastify";

const VerifyCard = ({ name, email, linkedin, id, refreshData }) => {
  const [submitting, setSubmitting] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState("");

  const handleApprove = async () => {
    setSubmitting(true);
    const url = alumniEps?.verification?.approve;
    try {
      const body = { userID: id, verificationStatus: 1 }
      const res = await fetcherPut(url,{ body });
      toast.success("Successfully Approved");
      refreshData();
    } catch (err) {
      toast.error(err);
    }
    setOpenConfirmDialog("");
    setSubmitting(false);
  };

  const handleReject = async () => {
    setSubmitting(true);
    const url = alumniEps?.verification?.reject;
    try {
      const body = { userID: id }
      const res = await fetcherPost(url,{ body });
      toast.success("Alumni Rejected");
      refreshData();
    } catch (err) {
      toast.error(err);
    }
    setOpenConfirmDialog("");
    setSubmitting(false);
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          width: '100%',
          height: 'fit-content',
          boxShadow: 2,
          borderRadius: "0.5rem",
          padding: "0.625rem 0.875rem",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={500}>
            {name}
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Email />
            {/* <Typography variant='body1' fontWeight={500}>Email:</Typography> */}
            <Typography variant="body1" fontWeight={400}>
              {email}
            </Typography>
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <LinkedIn />
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {linkedin?.slice(12)}
            </a>
            {/* <Typography variant='body1' fontWeight={500}>LinkedIn:</Typography> */}
            {/* <Typography variant='body1' fontWeight={400}>LinkedIn profile URL</Typography> */}
          </Stack>
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              color="success"
              onClick={() => setOpenConfirmDialog("Approve")}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenConfirmDialog("Reject")}
            >
              Reject
            </Button>
          </Stack>
        </Stack>
      </Box>
      {openConfirmDialog !== "" && (
        <VerifyConfirmDialog
          isOpen={openConfirmDialog !== ""}
          onClose={() => setOpenConfirmDialog("")}
          confirmType={openConfirmDialog}
          handleConfirm={
            openConfirmDialog === "Approve" ? handleApprove : handleReject
          }
          submitting={submitting}
        />
      )}
    </>
  );
};

export default VerifyCard;
