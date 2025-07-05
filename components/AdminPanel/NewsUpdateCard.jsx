import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Stack,
  Link,
} from "@mui/material";
import {
  EditOutlined,
  DeleteOutlined,
  LinkOutlined,
} from "@mui/icons-material";
import NewsEditDialog from "./Dialogs/NewsEditDialog";
import DeleteDialog from "./Dialogs/DeleteDialog";
import { alumniEps } from "../../utils/AdminPanel/endpoints";
import { fetcherPost } from "../../utils/axiosAPI";
import { toast } from "react-toastify";

const NewsUpdateCard = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState("");

  const handleDelete = async () => {
    setSubmitting(true);
    const url = alumniEps?.news?.delete;
    try {
      const body = { newsID: props.id };
      const res = await fetcherPost(url, { body });
      toast.success("News Deleted Successfully");
      props.getAllNews();
    } catch (err) {
      toast.error(err);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{ padding: "1em", width: { xs: "100%", xl: "70%" }, boxShadow: 2 }}
      >
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Stack spacing={1}>
              <Stack
                spacing={3}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h5" fontWeight={700}>
                  {props.title}
                </Typography>
                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                  <Button
                    variant="outlined"
                    color="info"
                    startIcon={<EditOutlined />}
                    onClick={() => setOpenDialog("edit")}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlined />}
                    onClick={() => setOpenDialog("delete")}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>
              <Typography variant="body1">{props.description}</Typography>
            </Stack>
          </Grid>
          <Grid item container spacing={2} direction={"column"}>
            <Grid item container spacing={2}>
              <Grid item container spacing={1} direction={"row"}>
                {props.tags?.map((tag, index) => (
                  <Grid item key={index + tag}>
                    <div className="px-4 py-1 bg-[#F5DEE7] border-2  h-fit border-[#FA005E] rounded-3xl text-xs  font-semibold">
                      {tag}
                    </div>
                  </Grid>
                ))}
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems={"center"}>
                  <Grid item>
                    <LinkOutlined color="disabled" />
                  </Grid>
                  <Grid item>
                    <a
                      href={props.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      News Article Link
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openDialog === "edit" && (
        <NewsEditDialog
          isOpen={openDialog === "edit"}
          onClose={() => setOpenDialog("")}
          newsData={props}
          type={"edit"}
          refreshData={props.getAllNews}
        />
      )}
      {openDialog === "delete" && (
        <DeleteDialog
          isOpen={openDialog === "delete"}
          onClose={() => setOpenDialog("")}
          deleteType={"News"}
          handleConfirm={handleDelete}
          submitting={submitting}
        />
      )}
    </>
  );
};

export default NewsUpdateCard;
