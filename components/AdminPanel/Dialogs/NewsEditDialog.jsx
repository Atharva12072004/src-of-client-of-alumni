import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { fetcherPost, fetcherPut } from "../../../utils/axiosAPI";
import { toast } from "react-toastify";
import { alumniEps } from "../../../utils/AdminPanel/endpoints";

const NewsEditDialog = ({ isOpen, onClose, refreshData, newsData, type }) => {
  const [newsDetails, setNewsDetails] = useState({
    title: newsData?.title ?? "",
    description: newsData?.description ?? "",
    link: newsData?.link ?? "",
    tags: newsData?.tags ? newsData?.tags?.join(", ") : "",
  });
  const [errors, setErrors] = useState({
    title: false,
    link: false,
    tags: false,
    description: false,
  });

  useEffect(() => {
    setNewsDetails({
      title: newsData?.title ?? "",
      description: newsData?.description ?? "",
      link: newsData?.link ?? "",
      tags: newsData?.tags ? newsData?.tags?.join(", ") : "",
    });
  }, [newsData]);

  const validateTags = (tagArray) => {
    if (tagArray?.length > 4) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tags: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        tags: false,
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "tags":
        const tagsArray = value.split(", ").map((tag) => tag);
        validateTags(tagsArray);
        break;

      default:
        break;
    }

    setNewsDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddNews = async () => {
    // e.preventDefault(); // Prevent default form submission behavior
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fill all the fields correctly.");
      return;
    }
    // Check if all required fields are filled in
    if (
      !newsDetails.title ||
      !newsDetails.description ||
      !newsDetails.link ||
      !newsDetails.tags
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const url = alumniEps?.news?.add;

    const body = {
      title: newsDetails.title,
      link: newsDetails.link,
      description: newsDetails.description,
      tags: newsDetails.tags.split(", "),
      floatedBy: "AdminUser"
    };

    // console.log(body);

    try {
      const response = await fetcherPost(url, { body });
      if (response) {
        onClose();
        toast.success("News Added Successfully");
        refreshData();
      } else {
        toast.error("Failed to add news");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditNews = async () => {
    // e.preventDefault(); // Prevent default form submission behavior
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fill all the fields correctly.");
      return;
    }
    // Check if all required fields are filled in
    if (
      !newsDetails.title ||
      !newsDetails.description ||
      !newsDetails.link ||
      !newsDetails.tags
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const url = alumniEps?.news?.edit;

    const body = {
      newsID: newsData.id,
      title: newsDetails.title,
      link: newsDetails.link,
      description: newsDetails.description,
      tags: newsDetails.tags.split(", "),
    };

    // console.log(body);

    try {
      const response = await fetcherPut(url, { token: localStorage.getItem("token"), body });
      if (response) {
        onClose();
        toast.success("News Updated Successfully");
        refreshData();
      } else {
        toast.error("Failed to update news");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{type === "edit" ? "Edit News" : "Add News"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          type="text"
          name="title"
          fullWidth
          value={newsDetails.title}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Link"
          type="text"
          name="link"
          fullWidth
          value={newsDetails.link}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Description"
          type="text"
          name="description"
          fullWidth
          value={newsDetails.description}
          onChange={handleChange}
          margin="dense"
        />

        <TextField
          label="Tags"
          type="text"
          name="tags"
          placeholder="eg: Event, Scholarship..."
          fullWidth
          value={newsDetails.tags}
          onChange={handleChange}
          margin="dense"
        />
        {errors.tags ? (
          <p style={{ color: "red" }}>Maximum of 4 tags per news</p>
        ) : null}
      </DialogContent>
      <Stack
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
        spacing={2}
        sx={{ padding: "1em" }}
      >
        <Button onClick={onClose}>Cancel</Button>
        {type === "edit" ? (
          <Button onClick={handleEditNews} variant="contained" color="primary">
            Save
          </Button>
        ) : (
          <Button onClick={handleAddNews} variant="contained" color="primary">
            Add
          </Button>
        )}
      </Stack>
    </Dialog>
  );
};

export default NewsEditDialog;
