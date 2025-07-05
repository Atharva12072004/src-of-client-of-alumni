import React, { useState } from "react";
import { Grid, Typography, Button, Avatar, Box, Paper, Stack } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import DeleteDialog from "./Dialogs/DeleteDialog";
import { alumniEps } from "../../utils/AdminPanel/endpoints";
import { fetcherPost } from "../../utils/axiosAPI";
import { toast } from "react-toastify";

const UserDeleteCard = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleUserDelete = async () => {
    setSubmitting(true);
    const url = alumniEps?.user?.delete;
    try {
      const body = { userID: props.userId }
      const res = await fetcherPost(url,{ body });
      toast.success("Successfully Deleted");
      console.log("Toast ke baad aa gaye");
      props.getAllUsers();
    } catch (err) {
      toast.error(err);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Box component={Paper} sx={{ boxShadow: 2 }}>
      <Grid
        container
        spacing={{ xs: 3, md: 2 }}
        sx={{ backgroundColor: "white" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        alignItems={"center"}
        className="p-4 shadow-md rounded-md"
      >
        <Grid item container xs={12} sm={9}>
          <Grid
            item
            xs={12}
            sm={3}
            className="flex justify-center lg:justify-start"
          >
            <Avatar
              src={props.imageSrc || "/blank-profile-picture.webp"}
              alt={props.name}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={9} className="pt-4 lg:pt-0">
            <Grid container spacing={1} direction={"column"}>
              <Grid item className="flex justify-center lg:justify-start">
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <Typography variant="h5" fontWeight="bold">
                        {props.name}
                    </Typography>
                    <Typography variant="body1">
                        {props.rank === 1 && '(Alumni)'}
                        {props.rank === 2 && '(Student)'}
                        {props.rank === 3 && '(Outsider)'}
                    </Typography>
                </Stack>
              </Grid>
              <Grid item className="flex justify-center lg:justify-start">
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {props.batch} || {props.branch}
                </Typography>
              </Grid>
              <Grid item className="flex justify-center lg:justify-start">
                <Typography variant="body2" color="textSecondary">
                  {props.position} at {props.company}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12} sm={3}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlined />}
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete User
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    {openDeleteDialog && (
        <DeleteDialog
          isOpen={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          deleteType={"User"}
          handleConfirm={handleUserDelete}
          submitting={submitting}
        />
      )}
    </>
  );
};

export default UserDeleteCard;
