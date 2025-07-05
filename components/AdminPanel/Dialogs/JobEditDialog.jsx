import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { fetcherPut, fetcherPost } from "../../../utils/axiosAPI";
import { toast } from "react-toastify";
import { alumniEps } from "../../../utils/AdminPanel/endpoints";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../../store/atoms/User";

const JobEditDialog = ({ isOpen, onClose, refreshData, jobData, type }) => {
  const [jobDetails, setJobDetails] = useState({
    position: jobData?.jobPosition ?? "",
    company: jobData?.company ?? "",
    location: jobData?.location ?? "",
    startDate: jobData?.startDate ?? "",
    stipend: jobData?.stipend ?? "",
    batch: jobData?.batch?.join(",") ?? "",
    category: jobData?.category === "0" ? "job" : "internship",
    jobUrl: jobData?.jobURL ?? "",
  });
  const [errors, setErrors] = useState({
    batch: false,
    location: false,
    stipend: false,
  });
  const currentYear = new Date().getFullYear();

  const user = useRecoilValue(userAtom);

  useEffect(() => {
    setJobDetails({
      position: jobData?.jobPosition ?? "",
      company: jobData?.company ?? "",
      location: jobData?.location ?? "",
      startDate: jobData?.startDate ?? "",
      stipend: jobData?.stipend ?? "",
      batch: jobData?.batch?.join(",") ?? "",
      category: jobData?.category === "0" ? "job" : "internship",
      jobUrl: jobData?.jobURL ?? "",
    });
  }, [jobData]);

  const validateBatch = (batchArray) => {
    const isValid = batchArray.every(
      (num) => num >= 20 && num <= (currentYear + 4) % 2000
    );
    if (!isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        batch: true,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        batch: false,
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "batch":
        const batchArray = value
          .split(",")
          .map((num) => parseInt(num.trim(), 10)); // Trim spaces and parse as numbers
        validateBatch(batchArray);
        break;

      case "location":
        if (value.length > 30) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            location: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            location: false,
          }));
        }
        break;

      case "stipend":
        if (!/^\d+$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            stipend: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            stipend: false,
          }));
        }
        break;

      case "contact":
        if (!/^\d{10}$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            contact: true,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            contact: false,
          }));
        }
        break;
      default:
        break;
    }

    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddJob = async () => {
    // e.preventDefault(); // Prevent default form submission behavior
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fill all the fields correctly.");
      return;
    }
    // Check if all required fields are filled in
    if (
      !jobDetails.position ||
      !jobDetails.company ||
      !jobDetails.location ||
      !jobDetails.batch ||
      !jobDetails.startDate ||
      !jobDetails.stipend ||
      !jobDetails.category ||
      !jobDetails.jobUrl
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const url = alumniEps?.jobs?.add;

    const body = {
      jobURL: jobDetails.jobUrl,
      floatedBy: user?.basic?.name,
      floatedByID: user?.basic?.id,
      jobLocation: jobDetails.location,
      companyName: jobDetails.company,
      eligibleBatch: jobDetails.batch.split(","),
      title: jobDetails.position,
      stipend: jobDetails.stipend,
      startDate: jobDetails.startDate,
      category: jobDetails.category === "job" ? 0 : 1,
    };

    // console.log(body);

    try {
      const response = await fetcherPost(url, { body });
      onClose();
      toast.success("Job Updated Successfully");
      refreshData();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEditJob = async () => {
    // e.preventDefault(); // Prevent default form submission behavior
    if (Object.values(errors).some((error) => error)) {
      toast.error("Please fill all the fields correctly.");
      return;
    }
    // Check if all required fields are filled in
    if (
      !jobDetails.position ||
      !jobDetails.company ||
      !jobDetails.location ||
      !jobDetails.batch ||
      !jobDetails.startDate ||
      !jobDetails.stipend ||
      !jobDetails.category ||
      !jobDetails.jobUrl
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const url = alumniEps?.jobs?.edit;

    const body = {
      jobID: jobData.id,
      jobURL: jobDetails.jobUrl,
      floatedBy: jobData?.postedBy ?? "",
      floatedByID: jobData?.posterID ?? "",
      jobLocation: jobDetails.location,
      companyName: jobDetails.company,
      eligibleBatch: jobDetails.batch.split(","),
      title: jobDetails.position,
      stipend: jobDetails.stipend,
      startDate: jobDetails.startDate,
      category: jobDetails.category === "job" ? "0" : "1",
    };

    // console.log(body.eligibleBatch);

    try {
      const response = await fetcherPut(url, {
        token: localStorage.getItem("token"),
        body,
      });
      onClose();
      toast.success("Job Updated Successfully");
      refreshData();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{type === "edit" ? "Edit Job" : "Add Job"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Job Position"
          type="text"
          name="position"
          fullWidth
          value={jobDetails.position}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Company Name"
          type="text"
          name="company"
          fullWidth
          value={jobDetails.company}
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Job Link"
          type="text"
          name="jobUrl"
          fullWidth
          value={jobDetails.jobUrl}
          onChange={handleChange}
          margin="dense"
        />

        <div>
          {" "}
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              label="Category"
              name="category"
              value={jobDetails.category}
              onChange={handleChange}
            >
              {/* Define the dropdown options */}
              <MenuItem value="job">Job</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
          </FormControl>
        </div>
        <TextField
          label="Location"
          type="text"
          name="location"
          fullWidth
          value={jobDetails.location}
          onChange={handleChange}
          margin="dense"
        />
        {errors.location ? (
          <p style={{ color: "red" }}>Input must not exceed 30 charcters.</p>
        ) : null}
        <TextField
          label="Batch(es)"
          type="text"
          name="batch"
          placeholder="eg: 22,23,24..."
          fullWidth
          value={jobDetails.batch}
          onChange={handleChange}
          margin="dense"
        />
        {errors.batch ? (
          <p style={{ color: "red" }}>
            All batch numbers must be between 20 and {(currentYear + 4) % 100}
          </p>
        ) : null}
        <TextField
          label="Stipend (in ₹)"
          type="text"
          name="stipend"
          fullWidth
          value={jobDetails.stipend}
          onChange={handleChange}
          margin="dense"
        />
        {errors.stipend ? (
          <p style={{ color: "red" }}>Enter only the amount, without $ or ₹</p>
        ) : null}
        <div className="flex">
          <p className=" mt-6 mr-8 ml-1">START DATE:</p>
          <TextField
            label=""
            type="date"
            name="startDate"
            value={jobDetails.startDate}
            onChange={handleChange}
            margin="dense"
          />
        </div>
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
          <Button onClick={handleEditJob} variant="contained" color="primary">
            Save
          </Button>
        ) : (
          <Button onClick={handleAddJob} variant="contained" color="primary">
            Add
          </Button>
        )}
      </Stack>
    </Dialog>
  );
};

export default JobEditDialog;
