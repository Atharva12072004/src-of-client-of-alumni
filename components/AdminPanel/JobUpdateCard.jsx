import React, { useState } from "react";
import Location from "../../assets/Components/Cards/Location.svg";
import _ from "lodash";
import Clock from "../../assets/Components/Cards/Clock.svg";
import StartDate from "../../assets/Components/Cards/StartDate.svg";
import Stipend from "../../assets/Components/Cards/Stipend.svg";
import Batch from "../../assets/Components/Cards/Batch.svg";
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
import JobEditDialog from "./Dialogs/JobEditDialog";
import DeleteDialog from "./Dialogs/DeleteDialog";
import { alumniEps } from "../../utils/AdminPanel/endpoints";
import { fetcherPost } from "../../utils/axiosAPI";
import { toast } from "react-toastify";

const JobUpdateCard = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [openDialog, setOpenDialog] = useState("");

  const handleDelete = async () => {
    setSubmitting(true);
    const url = alumniEps?.jobs?.delete;
    try {
      const body = { jobID: props.id }
      const res = await fetcherPost(url, { body });
      console.log("Ho gaya wait");
      toast.success("Job Deleted Successfully");
      props.getAllJobs();
    } catch (err) {
      toast.error(err);
    }
    setSubmitting(false);
    setOpenDialog("");
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
                <Stack spacing={3} direction={"row"} alignItems={"center"}>
                  <Typography variant="h5" fontWeight={700}>
                    {props.jobPosition}
                  </Typography>
                  <div className="px-4 py-1 bg-[#F5DEE7] border-2  h-fit border-[#FA005E] rounded-3xl text-xs  font-bold ">
                    {props.category === 1 ? "Internship" : "Job"}
                  </div>
                </Stack>
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
              <Typography fontWeight={600} color={"gray"}>
                {props.company}
              </Typography>
            </Stack>
          </Grid>
          <Grid item container spacing={2} direction={"column"}>
            <Grid item container spacing={1} alignItems={"center"}>
              <Grid item>
                <img src={Location} alt="Location" className="w-4 h-4" />
              </Grid>
              <Grid item className="pb-[3px]">
                {_.capitalize(props.location)}
              </Grid>
            </Grid>
            <Grid item container spacing={1} alignItems={"center"}>
              <Grid item>
                <img src={Clock} alt="Posted " className="w-4 h-4" />
              </Grid>
              <Grid item className="pb-[3px]">
                Posted: {props.posted}
              </Grid>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item container spacing={1} alignItems={"center"}>
                <Grid item xs={12} sm={6} md={3}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item>
                      <img
                        src={StartDate}
                        alt="Start Date"
                        className="w-4 h-4"
                      />
                    </Grid>
                    <Grid item>
                      <p>START DATE:</p>
                    </Grid>
                  </Grid>
                  <p className={`ml-4 pl-1.5`}>{props.displayStartDate}</p>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item>
                      <img src={Stipend} alt="Stipend" className="w-4 h-4" />
                    </Grid>
                    <Grid item>
                      {props.category ? <p>Stipend</p> : <p>CTC</p>}
                    </Grid>
                  </Grid>
                  <p className={`ml-5 pl-1`}>₹{props.stipend}</p>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item>
                      <img src={Batch} alt="Batch" className="w-4 h-4" />
                    </Grid>
                    <Grid item>
                      <p>Batch</p>
                    </Grid>
                  </Grid>
                  <div className={`ml-5`}>
                    {props.batch?.map((item, index) => (
                      <span className="pl-1" key={index}>
                        {index > 0 && ","}
                        {item}
                      </span>
                    ))}
                  </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item>
                      <img src={Clock} alt="Posted By" className="w-4 h-4" />
                    </Grid>
                    <Grid item>
                      <p>Posted By</p>
                    </Grid>
                  </Grid>
                  <p className={`ml-5 pl-1`}>{props.postedBy}</p>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container spacing={1} alignItems={"center"}>
                  <Grid item>
                    <LinkOutlined color="disabled" />
                  </Grid>
                  <Grid item>
                    <a
                      href={props.jobURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Job Application Link
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {openDialog === "edit" && (
        <JobEditDialog
          isOpen={openDialog === "edit"}
          onClose={() => setOpenDialog("")}
          jobData={props}
          type="edit"
          refreshData={props.getAllJobs}
        />
      )}
      {openDialog === "delete" && (
        <DeleteDialog
          isOpen={openDialog === "delete"}
          onClose={() => setOpenDialog("")}
          deleteType={"Job"}
          handleConfirm={handleDelete}
          submitting={submitting}
        />
      )}
    </>
  );
};

export default JobUpdateCard;
