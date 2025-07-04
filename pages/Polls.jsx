import Navbar from "../template/Navbar";
import Footer from "../template/Footer";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/User";
import PollCard from "../components/Cards/PollCard";
import AddPollDialog from "../components/AddPollDialog";
import { Grid, Typography } from "@mui/material";
import { fetcherGet } from "../utils/axiosAPI";

const Polls = () => {
  const user = useRecoilValue(userAtom);
  const [displayPolls, setDisplayPolls] = useState([]);
  const [allPolls, setAllPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMyPolls, setViewMyPolls] = useState(false);
  const [openAddPoll, setOpenAddPoll] = useState(false);

  const getAllPolls = async () => {
    setLoading(true);
    try {
      const res = await fetcherGet("/poll/getAll");
      if (Array.isArray(res) && res?.length > 0) {
        res?.reverse();
        setAllPolls(res);
        if(viewMyPolls) setDisplayPolls(res?.filter((poll) => poll.floatedByID === user?.basic?.id));
        else setDisplayPolls(res);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPolls();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (viewMyPolls) setDisplayPolls(allPolls?.filter(
      (poll) => poll.floatedByID === user?.basic?.id
    ));
    else setDisplayPolls(allPolls);
    // eslint-disable-next-line
  }, [viewMyPolls, allPolls]);

  useEffect(() => {
    // Set inert on the main content when dialog is open
    const mainContent = document.querySelector("#root > div");
    if (openAddPoll && mainContent) {
      mainContent.setAttribute("inert", "true");
    } else if (mainContent) {
      mainContent.removeAttribute("inert");
    }
    return () => {
      if (mainContent) mainContent.removeAttribute("inert");
    };
  }, [openAddPoll]);

  const handleRemovePoll = (pollID) => {
    // const filteredMyPolls = displayPolls?.filter((poll) => poll.pollID !== pollID);
    const filteredAllPolls = allPolls?.filter((poll) => poll.pollID !== pollID);
    // setDisplayPolls(filteredMyPolls);
    setAllPolls(filteredAllPolls);
  }

  const handleUpdatePoll = (updatedPoll) => {
    const updPolls = allPolls?.map((poll) => {
      if(poll.pollID === updatedPoll?.pollID) return updatedPoll;
      return poll;
    });
    setAllPolls(updPolls);
  }

  const handleAllPollsClick = () => {
    setViewMyPolls(false);
  };

  const handleMyPollsClick = () => {
    setViewMyPolls(true);
  };

  return (
    <>
      <div
        className={`${
          (user?.basic?.rank === 3 || user?.basic?.rank === -1) && "h-screen"
        }`}
      >
        <Navbar />
        {(user?.basic?.rank === 3 || user?.basic?.rank === -1) && (
          <div className="mx-14 py-14">
            <p style={{ marginTop: "75px" }}></p>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Typography
                className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow"
                // style={{ marginBottom: "1rem" }}
              >
                Want to view and vote in polls? Login using acpce college mail
              </Typography>
            </Grid>
          </div>
        )}
        <div className="py-32 px-16 flex flex-col gap-5 items-center">
          {user?.basic?.rank !== 3 && user?.basic?.rank !== -1 && (
            <>
              <div className="flex gap-4 items-center glass-effect rounded-2xl p-6 shadow-pink-glow">
                <button
                  className="flex p-2 m-2 text-md font-semibold text-black bg-white rounded-md border border-black hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out  "
                  style={{
                    letterSpacing: "0.075em",
                    borderWidth: "1.25px",
                  }}
                  onClick={() => setOpenAddPoll(true)}
                >
                  Add Poll
                </button>
                <button
                  className={`flex p-2 m-2 text-md font-semibold ${
                    viewMyPolls ? "text-white bg-black" : "text-black bg-white"
                  } rounded-md border border-black hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out`}
                  style={{
                    letterSpacing: "0.075em",
                    borderWidth: "1.25px",
                  }}
                  onClick={handleMyPollsClick}
                >
                  My Polls
                </button>
                <button
                  className={`flex p-2 m-2 text-md font-semibold ${
                    !viewMyPolls ? "text-white bg-black" : "text-black bg-white"
                  } rounded-md border border-black hover:bg-black hover:text-white hover:shadow-md transition duration-300 ease-in-out`}
                  style={{
                    letterSpacing: "0.075em",
                    borderWidth: "1.25px",
                  }}
                  onClick={handleAllPollsClick}
                >
                  All Polls
                </button>
              </div>
              {loading ? (
                <div className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow">
                  <p className=" text-primaryPink font-bold font-poppins text-xl px-6 py-4">
                    Loading...
                  </p>
                </div>
              ) : displayPolls?.length === 0 ? (
                <div className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow">
                  <p className=" text-primaryPink font-bold font-poppins text-xl px-6 py-4">
                    No Polls Found
                  </p>
                </div>
              ) : (
                <>
                  {displayPolls?.map((poll) => {
                    let voted = false;
                    poll.options?.map((opt) => {
                      if(opt?.votedUsers && opt?.votedUsers?.includes(user?.basic?.email)){
                        voted = true;
                      }
                      return true;
                    });

                    return (
                      <PollCard
                        key={poll.pollID}
                        pollID={poll.pollID}
                        displayResults={viewMyPolls || voted}
                        title={poll.title}
                        options={poll.options}
                        userEmail={user?.basic?.email}
                        canDelete={viewMyPolls}
                        removePoll={handleRemovePoll}
                        updatePoll={handleUpdatePoll}
                      />
                    )
                  })}
                </>
              )}
            </>
          )}
        </div>
        <div
          className={`${
            (user?.basic?.rank === 3 || user?.basic?.rank === -1) &&
            "flex lg:absolute lg:bottom-0 w-screen"
          }`}
        >
          <Footer />
        </div>
      </div>
      {openAddPoll && (
        <AddPollDialog
          open={openAddPoll}
          onClose={() => setOpenAddPoll(false)}
          user={user}
          refreshPollData={getAllPolls}
        />
      )}
    </>
  );
};

export default Polls;
