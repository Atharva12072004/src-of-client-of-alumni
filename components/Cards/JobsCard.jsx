import Location from "../../assets/Components/Cards/Location.svg";
import _ from "lodash";
import Clock from "../../assets/Components/Cards/Clock.svg";
import StartDate from "../../assets/Components/Cards/StartDate.svg";
import Stipend from "../../assets/Components/Cards/Stipend.svg";
import Batch from "../../assets/Components/Cards/Batch.svg";
import { BorderButton, PrimaryButton } from "../Buttons";
import { toast } from "react-toastify";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { NavLink } from "react-router-dom";
import {fetcherPost} from "../../utils/axiosAPI";

const JobsCard = (props) => {
  const rank = props.rank;
  const shouldBlur = (value) => {
    if (rank === -1 && value !== "jobPosition") return "blur-sm";
    else if (rank === 3 && value === "postedBy") return "blur-sm";
    return "";
  };

  const handleApplyClick = () => {
    window.open(props.jobURL, "_blank", "noopener,noreferrer");
  };

  const handleRequestReferral = async () =>{
      const url = "/job/referral";
      const body = {
        floatedByID: props.floatedByID,
        title: props.jobPosition,
        company: props.company,
        jobID: props.jobID
      };

      try {
        const response = await fetcherPost(url, { body });
        if (response) {
          toast.success(response.msg);
        }
      } catch (error) {
        console.error("Error adding job:", error);
        toast.error("Error adding job");
      }

  }

  return (
    <>
      <Box
        component={Paper}
        sx={{ 
          padding: "1em", 
          width: { xs: "100%", xl: "70%" },
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 20px rgba(255, 105, 180, 0.2)",
        }}
        className="rounded-3xl"
      >
        <Grid container spacing={2} direction="column">
          <Grid item container>
            <Grid item container spacing={3}>
              <Grid item>
                <Typography variant="h5" fontWeight={700}>
                  {props.jobPosition}
                </Typography>
              </Grid>
              <Grid item>
                <div className="px-4 py-1 bg-[#F5DEE7] border-2  h-fit border-[#FA005E] rounded-3xl text-xs  font-bold ">
                  {props.category === 1 ? "Internship" : "Job"}
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Typography fontWeight={600} color={"gray"}>
                {props.company}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={2} direction={"column"}>
            <Grid item container spacing={1} alignItems={"center"}>
              <Grid item>
                <img src={Location} alt="Location" className="w-4 h-4" />
              </Grid>
              <Grid item className="pb-[3px]">{_.capitalize(props.location)}</Grid>
            </Grid>
            <Grid item container spacing={1} alignItems={"center"}>
              <Grid item>
                <img src={Clock} alt="Posted " className="w-4 h-4" />
              </Grid>
              <Grid item className="pb-[3px]">Posted: {props.posted}</Grid>
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
                  <p className={`ml-4 pl-1.5 ${shouldBlur("startDate")}`}>
                    {props.startDate}
                  </p>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                  <Grid container spacing={1} alignItems={"center"}>
                    <Grid item>
                      <img src={Stipend} alt="Stipend" className="w-4 h-4" />
                    </Grid>
                    <Grid item>
                    {props.category ? <p>Stipend</p> : <p>CTC</p>}
                      {/* <p>Stipend</p> */}
                    </Grid>
                  </Grid>
                  <p className={`ml-5 pl-1 ${shouldBlur("stipend")}`}>
                    ₹{props.stipend}
                  </p>
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
                  <div className={`ml-5 ${shouldBlur("batch")}`}>
                    {props.batch.map((item, index) => (
                      <span className="pl-1" key={index}>
                        {index > 0 && ","}{item}
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
                  <p className={`ml-5 pl-1 ${shouldBlur("postedBy")}`}>
                    {props.postedBy}
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              container
              spacing={1}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Grid item>
                {rank === 0 || rank === 1 || rank === 2 ? (
                  <div onClick={handleApplyClick}>
                    <PrimaryButton name="Apply" isDisabled={false} />
                  </div>
                ) : (
                  <PrimaryButton name="Apply" isDisabled={true} />
                )}
              </Grid>
              <Grid item>
                {rank === 0 || rank === 1 || rank === 2 ? (
                  <div onClick={handleRequestReferral}>
                  <BorderButton
                    name="Request for Referal"
                    isDisabled={false}
                  />
                  </div>
                ) : (
                  <BorderButton name="Request for referal" isDisabled={true} />
                )}
              </Grid>
              <Grid item>
                {rank === 0 || rank === 1 || rank === 2 ? (
                  <NavLink to={`/view?id=${props.floatedByID}`}>
                    <BorderButton
                    name="View Profile"
                    isDisabled={false}
                  />
                  </NavLink>
                ) : (
                  <BorderButton name="View Profile" isDisabled={true} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* <div className="flex">
        <div
          className=" text-wrap rounded-md shadow-md bg-white w-11/12
        sm:w-7/12 pt-3 pb-3 pr-3 pl-3"
        >
          <div>
            <p className=" px-2 flex font-bold text-xl text-gray-800 ">
              <p>{props.jobPosition}</p>
              <div className="px-4 ml-7 py-1 bg-[#F5DEE7] border-2  h-fit border-[#FA005E] rounded-3xl text-xs  font-bold ">
                {props.category === 1 ? "Internship" : "Job"}
              </div>
            </p>
            <p className="  flex flex-col px-2 font-semibold text-gray-500">
              {props.company}
            </p>
          </div>
          <div className=" flex m-2">
            <img src={Location} alt="Location" className="w-4 h-4 m-1" />
            {_.capitalize(props.location)}
          </div>
          <div className="flex m-2 ">
            <img src={Clock} alt="Posted " className="w-4 h-4 m-1" />
            <p>Posted: {props.posted}</p>
          </div>
            <div className="sm:grid sm:grid-cols-4 sm:grid-rows-2 hidden">
              <div className="flex items-start m-2 ml-3 text-sm sm:ml-2">
                <img
                  src={StartDate}
                  alt="Start Date"
                  className="w-4 h-4 m-1  "
                />
                <p className="hidden sm:block">START DATE:</p>
              </div>

              <div className="flex items-center m-2 ml-3">
                <img src={Stipend} alt="Stipend" className="w-4 h-4 m-1" />
                <p className="hidden sm:block">Stipend</p>
              </div>

              <div className="flex items-center m-2 ml-3">
                <img src={Batch} alt="Batch" className="w-4 h-4 m-1" />
                <p className="hidden sm:block">Batch</p>
              </div>

              <div className="flex items-center m-2 ">
                <img src={Clock} alt="Posted By" className="w-4 h-4 m-1" />
                <p className="hidden sm:block">Posted By</p>
              </div>

              <p className={`ml-8 ${shouldBlur("startDate")}`}>
                {props.startDate}
              </p>
              <p className={`ml-8 ${shouldBlur("stipend")}`}>
                ₹{props.stipend}
              </p>
              <div className={`ml-8 ${shouldBlur("batch")}`}>
                {props.batch.map((item, index) => (
                  <span key={index}>
                    {index > 0 && ","} {item}
                  </span>
                ))}
              </div>
              <p className={`ml-8 ${shouldBlur("postedBy")}`}>
                {props.postedBy}
              </p>
            </div>

            <div className="sm:hidden">
              <div className="flex items-center m-2 ml-3 text-md">
                <img src={StartDate} alt="Start Date" className="w-4 h-4  " />
                <p
                  className="hidden sm:block"
                  style={{ letterSpacing: "0.05rem" }}
                >
                  START DATE:
                </p>
                <p className={`ml-2 ${shouldBlur("startDate")}`}>
                  {props.startDate}
                </p>
              </div>
              <div className="flex items-center m-2 ml-3">
                <img src={Stipend} alt="Stipend" className="w-4 h-4" />
                <p className="hidden sm:block">Stipend</p>
                <p className={`ml-2 ${shouldBlur("stipend")}`}>
                  {props.stipend}
                </p>
              </div>
              <div className="flex items-center m-2 ml-3">
                <img src={Batch} alt="Batch" className="w-4 h-4" />
                <p className="hidden sm:block">Batch</p>
                <p className={`ml-2 ${shouldBlur("batch")}`}>{props.batch}</p>
              </div>
              <div className="flex items-center m-2 ml-3 ">
                <img src={Clock} alt="Posted By" className="w-4 h-4" />
                <p className="hidden sm:block">Posted By</p>
                <p className={`ml-2 ${shouldBlur("postedBy")}`}>
                  {props.postedBy}
                </p>
              </div>
              <div className=" flex items-center m-2 ml-3 sm:hidden ">
                <img src={Clock} alt="posted at" className="w-4 h-4  " />
                <p className="ml-2">{props.posted}</p>
              </div>
            </div>

            <div className="flex justify-evenly">
              {rank === 0 || rank === 1 || rank === 2 ? (
                <PrimaryButton
                  onClick={() =>
                    toast.error("Login from acpce account to apply")
                  }
                  name="Apply"
                  isDisabled={false}
                />
              ) : (
                <PrimaryButton name="Apply" isDisabled={true} />
              )}
              <div className="hidden md:block">
                {rank === 0 || rank === 1 || rank === 2 || rank === 3 ? (
                  <BorderButton
                    onClick={() =>
                      toast.error(
                        "Login from acpce account to ask for referal"
                      )
                    }
                    name="Request for Referal"
                    isDisabled={false}
                  />
                ) : (
                  <BorderButton name="Request for referal" isDisabled={true} />
                )}
              </div>
              <div className="md:hidden">
                {rank === 0 || rank === 1 || rank === 2 || rank === 3 ? (
                  <BorderButton
                    onClick={() =>
                      toast.error(
                        "Login from acpce account to ask for referal"
                      )
                    }
                    name="Referal"
                    isDisabled={false}
                  />
                ) : (
                  <BorderButton name="Referal" isDisabled={true} />
                )}
              </div>
              <div className="hidden md:block">
                {rank === 0 || rank === 1 || rank === 2 ? (
                  <BorderButton
                    onClick={() =>
                      toast.error("Login from acpce account to view profile")
                    }
                    name="View Profile"
                    isDisabled={false}
                  />
                ) : (
                  <BorderButton name="View Profile" isDisabled={true} />
                )}
              </div>
              <div className="md:hidden">
                {rank === 0 || rank === 1 || rank === 2 ? (
                  <BorderButton
                    onClick={() =>
                      toast.error("Login from acpce account to view profile")
                    }
                    name="Profile"
                    isDisabled={false}
                  />
                ) : (
                  <BorderButton name="Profile" isDisabled={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default JobsCard;
