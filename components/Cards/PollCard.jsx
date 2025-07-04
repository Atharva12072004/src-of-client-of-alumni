import React, { useEffect, useState } from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { toast } from "react-toastify";
import { fetcherPost, fetcherPut } from "../../utils/axiosAPI";
import DeleteDialog from "../AdminPanel/Dialogs/DeleteDialog";

const PollCard = ({ title, canDelete = false, options = [], pollID, displayResults = false, userEmail = "", removePoll, updatePoll }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [displayStats, setDisplayStats] = useState(displayResults);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updatedOptionStats, setUpdatedOptionStats] = useState(options);

  useEffect(() => {
    setDisplayStats(displayResults);
  }, [displayResults])

  const handleVoteClick = async () => {
    if(selectedOption === null){
        toast.error("Select an option to vote");
    }
    else{
      setSubmitting(true);
      try {
        const body = {
          pollID: pollID,
          optionTitle: selectedOption,
          userEmail: userEmail
        };
        const res = await fetcherPut("/poll/castVote", { token: localStorage.getItem("token"), body });
        if(res?.msg){
          if(res?.updatedPoll){
            toast.success(res.msg);
            setUpdatedOptionStats(res?.updatedPoll?.options);
            updatePoll(res?.updatedPoll);
            setDisplayStats(true);
          } else {
            toast.error(res.msg);
          }
        }
      } catch (err) {
        if(typeof(err) === 'string') toast.error(err);
        console.log(err);
      }
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setSubmitting(true);
    try {
      const body = { pollID: pollID };
      const res = await fetcherPost("/poll/delete", { body });
      if(res?.msg) toast.success(res.msg);
      removePoll(pollID);
      setOpenDeleteConfirm(false);
    } catch (err) {
      if(typeof(err) === 'string') toast.error(err);
      console.log(err);
    }
    setSubmitting(false);
  }

  return (
    <>
      <Box
        component={Paper}
        sx={{
          width: "100%",
          height: "fit-content",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 20px rgba(252, 232, 247, 0.3)",
          borderRadius: "24px",
          padding: "0.625rem 0.875rem",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={500}>
            {title ?? "Poll Title"}
          </Typography>
          {displayStats || displayResults ? (
            <Stack spacing={1.5}>
              {updatedOptionStats?.map((option) => (
                <Stack key={option._id} spacing={2} direction={"row"} alignItems={"center"}>
                  <Typography variant="body1" fontWeight={600}>
                    {`${option.voteCount} Votes`}
                  </Typography>
                  <Typography variant="body1">
                    {`- ${option.optionTitle}`}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ) : (
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedOption}
                onChange={(event) => setSelectedOption(event.target.value)}
              >
                  {updatedOptionStats?.map((option) => (
                      <FormControlLabel
                        key={option._id}
                        value={option.optionTitle}
                        control={<Radio />}
                        label={option.optionTitle}
                      />
                  ))}
                  {/* <FormControlLabel value="female" control={<Radio />} label="Female" /> */}
              </RadioGroup>
            </FormControl>
          )}
          {!displayResults ? (
            <>
              {!displayStats && (
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Button variant="outlined" color="success" onClick={handleVoteClick}>
                    Vote
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setSelectedOption(null)}
                  >
                    Clear
                  </Button>
                </Stack>
              )}
            </>
          ) : canDelete && (
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button variant="outlined" color="error" onClick={() => setOpenDeleteConfirm(true)}>
                Delete Poll
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
      {openDeleteConfirm && (
        <DeleteDialog isOpen={openDeleteConfirm} onClose={() => setOpenDeleteConfirm(false)} deleteType={"Poll"} submitting={submitting} handleConfirm={handleDeleteConfirm} />
      )}
    </>
  );
};

export default PollCard;
