import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { alumniEps } from "../../utils/AdminPanel/endpoints";
import { fetcherGet } from "../../utils/axiosAPI";
import { Stack, Typography, Button, Box, CircularProgress } from "@mui/material";
import JobEditDialog from "../../components/AdminPanel/Dialogs/JobEditDialog";
import JobUpdateCard from "../../components/AdminPanel/JobUpdateCard";

const JobsHandle = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const getAllJobs = async () => {
    setLoading(true);
    const url = alumniEps?.jobs?.getAll;
    try {
      const res = await fetcherGet(url);
      setAllJobs(res);
    } catch (err) {
      toast.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  useEffect(() => {
    // Set inert on the main content when add dialog is open
    const mainContent = document.getElementById("root");
    if (openAddDialog && mainContent) {
      mainContent.setAttribute("inert", "true");
    } else if (mainContent) {
      mainContent.removeAttribute("inert");
    }
    return () => {
      if (mainContent) mainContent.removeAttribute("inert");
    };
  }, [openAddDialog]);

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
            <Typography variant="h4">Jobs</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenAddDialog(true)}
            >
              Add Job
            </Button>
          </Stack>
          {loading ? (
            <Stack justifyContent={'center'} alignItems={'center'} width={1} height={100}>
              <CircularProgress size={"2.5rem"} />
            </Stack>
          ) : allJobs?.length === 0 ? (
            <Stack justifyContent={'center'} alignItems={'center'} width={1} height={100}>
              <Typography variant="h5" fontWeight={600}>No Jobs Added</Typography>
            </Stack>
          ) : (
            <Stack spacing={3}>
              {allJobs?.map((item) => (
                <JobUpdateCard
                  key={item.jobID}
                  id={item.jobID}
                  jobPosition={item.title}
                  company={item.companyName}
                  location={item.jobLocation}
                  category={item.category}
                  jobURL={item.jobURL}
                  stipend={item.stipend}
                  postedBy={item.floatedBy}
                  posted={new Date(item.createdAt).toLocaleDateString(
                    "en-GB"
                  )}
                  startDate={new Date(item.startDate).toISOString().split('T')[0]}
                  displayStartDate={new Date(item.startDate).toLocaleDateString(
                    "en-GB"
                  )}
                  batch={item.eligibleBatch}
                  getAllJobs={getAllJobs}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
      {openAddDialog && (
        <JobEditDialog
          isOpen={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
          type={"add"}
          refreshData={getAllJobs}
        />
      )}
    </>
  );
};

export default JobsHandle;
