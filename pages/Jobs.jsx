import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { get_fetcher } from "../utils/Fetcher";
import Navbar from "../template/Navbar";
import Footer from "../template/Footer";
import { Grid, Typography, Pagination, Box, Paper } from "@mui/material";
import { JobsFilterButton } from "../components/jobsFilterButton";
import JobsCard from "../components/Cards/JobsCard";
import { userAtom } from "../store/atoms/User";
import { useRecoilValue } from "recoil";
import AddJobDialog from "../components/AddJobDialog";
import _ from "lodash";
import {fetcherGet} from "../utils/axiosAPI";

const Jobs = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const { data, isLoading } = useSWR(
  //   "http://localhost:5000/job/getAll",
  //   get_fetcher
  // );

    const getData = async () => {
      setIsLoading(true); // Start loading
      try {
        const url = "/job/getAll";
        const res = await fetcherGet(url);
        setData(res);
        // Process data here if necessary before setting it
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };




  const user = useRecoilValue(userAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const cardsPerPage = 5;

  useEffect(() => {
    console.log("User Details from Atom: ", user);
  }, [user]);

  useEffect(() => {
    getData();
  }, []);

  //  useEffect(() => {
  //    if (data) {
  //      console.log("Data: ", data);
  //    }
  //  }, [isLoading, data]);

  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    myjobs: false,
    addjob: false,
    jobs: false,
    internships: false,
    year2022: false,
    year2023: false,
    year2024: false,
    year2025: false,
    year2026: false,
    year2027: false,
  });

  useEffect(() => {
    if (!data) return;

    let filteredJobs = data.filter((job) => {
      if (filters.jobs && filters.internships) return false; // Either jobs or internships, not both
      if (filters.jobs && job.category !== 0) return false;
      if (filters.internships && job.category !== 1) return false;
      if (filters.year2022 && !job.eligibleBatch.includes(22)) return false;
      if (filters.year2023 && !job.eligibleBatch.includes(23)) return false;
      if (filters.year2024 && !job.eligibleBatch.includes(24)) return false;
      if (filters.year2025 && !job.eligibleBatch.includes(25)) return false;
      if (filters.year2026 && !job.eligibleBatch.includes(26)) return false;
      if (filters.year2027 && !job.eligibleBatch.includes(27)) return false;
      return true;
    });

    setFilteredData(filteredJobs);
  }, [data, filters]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [sort, setSort] = useState({
    recent: true,
    stipend: false,
  });

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (filteredData) {
      setSortedData(filteredData);
      console.log(filteredData);
      setNumOfPages(Math.ceil(filteredData.length / cardsPerPage));
      getCurrentPageData(1);
    }
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [filteredData]);

  useEffect(() => {
    if (sortedData.length > 0) {
      let sortedJobs = [...sortedData];
      if (sort.recent) {
        sortedJobs.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
      } else if (sort.stipend) {
        sortedJobs.sort((a, b) => b.stipend - a.stipend);
      }
      setSortedData((prevSortedData) => {
        if (JSON.stringify(prevSortedData) !== JSON.stringify(sortedJobs)) {
          return sortedJobs;
        }
        return prevSortedData;
      });
    }
  }, [sort, sortedData]);

  const handleSortClick = (sortName) => {
    setSort((prevSort) => ({
      stipend: false,
      recent: false,
      [sortName]: !prevSort[sortName],
    }));
  };

  //
  const handleFilterClick = (filterName) => {
    if (filterName === "addjob") {
      setIsDialogOpen(true);
    } else if (filterName === "myjobs") {
      const userEmail = user?.basic.email; // Assuming user email is accessible in userAtom
      if (userEmail) {
        const filteredJobs = data?.filter((job) => job.handler === userEmail);
        setFilteredData(filteredJobs);
      }
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    } else if (filterName === "jobs" || filterName === "internships") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
        [filterName === "jobs" ? "internships" : "jobs"]: false,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      }));
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scroll(0, 0);
  };

  const getCurrentPageData = (currPage) => {
    if (filteredData?.length < cardsPerPage) {
      setCurrentPageData(filteredData);
    } else {
      const startIndex = (currPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const newPageData = filteredData?.slice(startIndex, endIndex);
      setCurrentPageData(newPageData);
    }
  };

  useEffect(() => {
    getCurrentPageData(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    if (sortedData) {
      const pages = Math.ceil(sortedData.length / cardsPerPage);
      setNumOfPages(pages);
      setCurrentPageData(
        sortedData.slice(
          (currentPage - 1) * cardsPerPage,
          currentPage * cardsPerPage
        )
      );
    }
  }, [sortedData, currentPage, cardsPerPage]);

  return (
    <>
      <div>
        <Navbar />
        <div className="mx-14 py-14">
          <p style={{ marginTop: "75px" }}></p>
          {user.basic.rank === 3 && (
            <Typography
              className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow"
              style={{ marginBottom: "1rem" }}
            >
              {" "}
              Want to unblur the hidden sections ? Login using acpce college
              mail
            </Typography>
          )}
          {user.basic.rank === -1 && (
            <Typography
              className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow"
              style={{ marginBottom: "1rem" }}
            >
              {" "}
              Login to get more access and unblur hidden items.
            </Typography>
          )}
          <Grid
            container
            spacing={{ xs: 3 }}
            direction={{ xs: "column", lg: "row" }}
          >
            <Grid item xs={4} className="flex justify-center xl:justify-end">
              <Box
                component={Paper}
                sx={{
                  padding: "2em",
                  width: "fit-content",
                  height: "fit-content",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 20px rgba(255, 105, 180, 0.3)",
                }}
                className="rounded-3xl"
              >
                {user.basic.rank === 1 && (
                  <Grid item xs={12} className="flex justify-center mb-2">
                    <div className="flex font-bold">
                      <div>
                        <img
                          src="/actions_icon.svg"
                          alt="actions-icon"
                          className="mt-1.5 mr-1 h-6"
                        />
                      </div>
                      <div className="ml-1 text-2xl">Actions</div>
                    </div>
                  </Grid>
                )}
                <Grid item xs={12} className="flex justify-center">
                  <div className="flex">
                    {/* <div onClick={() => handleFilterClick("myjobs")}>
                      <JobsFilterButton name="MY JOBS" used={filters.myjobs} />
                    </div> */}
                    <div
                      className="ml-1"
                      onClick={() => handleFilterClick("addjob")}
                    >
                      {user.basic.rank === 1 && (
                        <JobsFilterButton name="ADD JOB" />
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center my-2">
                  <div className="flex font-bold">
                    <div>
                      <img
                        src="/filter_icon.svg"
                        alt="filter-icon"
                        className="mt-1.5 mr-1 h-6"
                      />
                    </div>
                    <div className="ml-1 text-2xl">Filter</div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center">
                  {user.basic.rank === 1 && (
                    <div onClick={() => handleFilterClick("myjobs")}>
                      <JobsFilterButton name="MY JOBS" used={filters.myjobs} />
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} className="flex justify-center">
                  <div className="flex">
                    <div onClick={() => handleFilterClick("jobs")} className="">
                      <JobsFilterButton name="JOBS" used={filters.jobs} />
                    </div>
                    <div
                      onClick={() => handleFilterClick("internships")}
                      className=""
                    >
                      <JobsFilterButton
                        name="INTERNSHIPS"
                        used={filters.internships}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center my-2">
                  <div className="flex font-bold">
                    <div>
                      <img
                        src="/filter_icon.svg"
                        alt="filter-icon"
                        className="mt-1.5 mr-1 h-6"
                      />
                    </div>
                    <div className="ml-1 text-2xl">Batches</div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center">
                  <div className="flex">
                    <div
                      onClick={() => handleFilterClick("year2022")}
                      className=""
                    >
                      <JobsFilterButton
                        name="2022 BATCH"
                        used={filters.year2022}
                      />
                    </div>
                    <div
                      onClick={() => handleFilterClick("year2023")}
                      className=""
                    >
                      <JobsFilterButton
                        name="2023 BATCH"
                        used={filters.year2023}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center">
                  <div className="flex">
                    <div
                      onClick={() => handleFilterClick("year2024")}
                      className=""
                    >
                      <JobsFilterButton
                        name="2024 BATCH"
                        used={filters.year2024}
                      />
                    </div>
                    <div
                      onClick={() => handleFilterClick("year2025")}
                      className=""
                    >
                      <JobsFilterButton
                        name="2025 BATCH"
                        used={filters.year2025}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center">
                  <div className="flex">
                    <div
                      onClick={() => handleFilterClick("year2026")}
                      className=""
                    >
                      <JobsFilterButton
                        name="2026 BATCH"
                        used={filters.year2026}
                      />
                    </div>
                    <div
                      onClick={() => handleFilterClick("year2027")}
                      className=""
                    >
                      <JobsFilterButton
                        name="2027 BATCH"
                        used={filters.year2027}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center mb-2 mt-4">
                  <div className="flex font-bold">
                    <div>
                      <img
                        src="/actions_icon.svg"
                        alt="actions-icon"
                        className="mt-1.5 mr-1 h-6"
                      />
                    </div>
                    <div className="ml-1 text-2xl">Sort By</div>
                  </div>
                </Grid>
                <Grid item xs={12} className="flex justify-center ">
                  <div className="flex">
                    <div onClick={() => handleSortClick("recent")}>
                      <JobsFilterButton name="RECENT" used={sort.recent} />
                    </div>
                    <div
                      className="ml-1"
                      onClick={() => handleSortClick("stipend")}
                    >
                      <JobsFilterButton name="STIPEND" used={sort.stipend} />
                    </div>
                  </div>
                </Grid>
              </Box>
              {/* <div className="bg-white min-h-40 py-14 px-10 rounded-md shadow-md w-fit">
                
              </div> */}
            </Grid>
            <Grid item xs={1} className="xl:flex items-center justify-center hidden">
              <div className="h-full bg-greyLine w-0.5"></div>
            </Grid>
            {isLoading ? (
              <p className=" text-primaryPink font-bold font-poppins text-xl px-6 py-4 ">
                Loading...
              </p>
            ) : currentPageData?.length === 0 ? (
              <p className=" text-primaryPink font-bold font-poppins text-xl px-6 py-4 ">
                {" "}
                No results found
              </p>
            ) : (
              <Grid item xs={7}>
                {currentPageData.map((job, index) => (
                  <div key={index} className="mb-14">
                    <JobsCard
                      jobID={job.jobID}
                      rank={user?.basic?.isLoggedIn ? user?.basic?.rank : -1}
                      jobPosition={job.title}
                      company={job.companyName}
                      category={job.category}
                      location={job.jobLocation}
                      posted={new Date(job.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                      stipend={job.stipend}
                      batch={job.eligibleBatch}
                      postedBy={job.floatedBy}
                      startDate={new Date(job.startDate).toLocaleDateString(
                        "en-GB"
                      )}
                      jobURL={job.jobURL}
                      floatedByID={job.floatedByID}
                    />
                  </div>
                ))}
                {numOfPages > 1 && (
                  <Pagination
                    count={numOfPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#FA005E",
                        borderColor: "#FA005E",
                        backgroundColor: "white",
                      },
                    }}
                    size="large"
                    //color="secondary"
                    //hidePrevButton
                    //hideNextButton
                  />
                )}
              </Grid>
            )}
          </Grid>
        </div>
        <Footer />
      </div>
      {isDialogOpen && (
        <AddJobDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          //setSortedData={setSortedData}
          refreshData={getData}
          setFilters={setFilters}
        />
      )}
    </>
  );
};

export default Jobs;
