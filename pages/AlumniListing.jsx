import Navbar from "../template/Navbar";
import Footer from "../template/Footer";
import {
  Grid,
  TextField,
  Pagination,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { JobsFilterButton } from "../components/jobsFilterButton";
import React, { useEffect, useState } from "react";
// import useSWR from "swr";
// import { get_fetcher } from "../utils/Fetcher";
import AlumniCard from "../components/Cards/AlumniCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/User";
import { fetcherGet } from "../utils/axiosAPI";
const _ = require("lodash");

const AlumniListing = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const { data, isLoading } = useSWR(
  //   "http://localhost:5000/admin/getAll",
  //   get_fetcher
  // );
  const user = useRecoilValue(userAtom);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const cardsPerPage = 5;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true); // Start loading
      try {
        const url = "/alumni/getAll";
        const res = await fetcherGet(url);
        setData(res);
        // Process data here if necessary before setting it
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    getData();
  }, [user]);

  const [filters, setFilters] = useState({
    //All: true,
    CSE: false,
    DSAI: false,
    ECE: false,
    year2022: false,
    year2023: false,
    year2024: false,
    year2025: false,
    year2026: false,
    year2027: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const filterBatches = (user) => {
    if (filters.year2022) {
      if (filters.year2023) {
        if (filters.year2024) {
          if (filters.year2025) return true;
          return user.batch !== 2025
        }
        return (filters.year2025 && user.batch === 2025) || user.batch === 2023
      }
      return user.batch === 2022;
    }
    else if (filters.year2023) {
      if (filters.year2024) {
        if (filters.year2025) return user.batch !== 2022;
        return user.batch !== 2025 && user.batch !== 2022
      }
      return user.batch === 2023
    }
    else if (filters.year2024) {
      if (filters.year2025) return user.batch === 2024 || user.batch === 2025;
      return user.batch === 2024
    }
    else if (filters.year2025) return user.batch === 2025;
    return true;
  };

  const filterBranches = (user) => {
    if (filters.CSE) {
      if (filters.DSAI && filters.ECE) return true;
      if (filters.DSAI && user.branch.toLowerCase() === "dsai") return true;
      if (filters.ECE && user.branch.toLowerCase() === "ece") return true;
      return user.branch.toLowerCase() === "cse"
    }
    else if (filters.DSAI) {
      if (filters.ECE && user.branch.toLowerCase() === "ece") return true;
      return user.branch.toLowerCase() === "dsai"
    }
    else if (filters.ECE) return user.branch.toLowerCase() === "ece"
    return true;
  };

  useEffect(() => {
    if (!data) return;

    let filteredAlumni = data.filter((user) => {
      //if (filters.year2022 && user.batch !== 2022) return false;
      //if (filters.year2023 && user.batch !== 2023) return false;
      //if (filters.year2024 && user.batch !== 2024) return false;
      //if (filters.year2025 && user.batch !== 2025) return false;
      //if (filters.year2026 && user.batch !== 2026) return false;
      //if (filters.year2027 && user.batch !== 2027) return false;
      if (searchQuery) {
        return filterBatches(user) && filterBranches(user) && user.name.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return filterBatches(user) && filterBranches(user);
    });

    setFilteredData(filteredAlumni);
  }, [data, filters, searchQuery]);

  console.log("Data: ", data);
  console.log("Filtered Data: ", filteredData);

  const handleFilterClick = (filterName) => {
    setFilters((prevFilters) => ({
      ...Object.fromEntries(
        Object.entries(prevFilters).map(([key, _]) => {
          if (key === filterName) return [key, !prevFilters[key]]
          return [key, _]
        })
      )
      // [filterName]: !prevFilters[filterName],
    }));
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
    if (filteredData) {
      console.log(filteredData);
      setNumOfPages(Math.ceil(filteredData.length / cardsPerPage));
      getCurrentPageData(1);
    }
    setCurrentPage(1);
    // eslint-disable-next-line
  }, [filteredData]);

  useEffect(() => {
    getCurrentPageData(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <>
      <div
        className={`${
          (user?.basic?.rank === 3 || user?.basic?.rank === -1) && "h-screen"
        }`}
      >
        <Navbar />
        <div className="mx-14 py-14">
          <p style={{ marginTop: "75px" }}></p>
          {user?.basic?.rank === 3 && (
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Typography
                className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow"
                style={{ marginBottom: "1rem" }}
              >
                Want to unblur this section? Login using acpce college mail
              </Typography>
            </Grid>
          )}
          {user?.basic?.rank === -1 && (
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <Typography
                className="flex justify-center glass-effect rounded-xl p-4 shadow-pink-glow"
                style={{ marginBottom: "1rem" }}
              >
                Login to get more access and unblur hidden items.
              </Typography>
            </Grid>
          )}
          {(user?.basic?.rank === 1 || user?.basic?.rank === 2) && (
            <Grid
              container
              spacing={{ xs: 4 }}
              direction={{ xs: "column", lg: "row" }}
            >
              <Grid item xs={3} className="flex justify-center xl:justify-end">
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
                  <div className="flex justify-center w-full">
                    <TextField
                      fullWidth
                      label="Search..."
                      variant="outlined"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Grid xs={12} className="flex justify-center mt-4 mb-2">
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
                  <Grid xs={12} className="flex justify-center">
                    <div className="flex">
                      {/* <div onClick={() => handleFilterClick("All")}>
                       <JobsFilterButton name="ALL" used={filters.All} />
                       </div> */}
                      <div onClick={() => handleFilterClick("CSE")}>
                        <JobsFilterButton name="CSE" used={filters.CSE} />
                      </div>
                      <div onClick={() => handleFilterClick("DSAI")}>
                        <JobsFilterButton name="DSAI" used={filters.DSAI} />
                      </div>
                      <div onClick={() => handleFilterClick("ECE")}>
                        <JobsFilterButton name="ECE" used={filters.ECE} />
                      </div>
                    </div>
                  </Grid>
                  <Grid xs={12} className="flex justify-center">
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
                  <Grid xs={12} className="flex justify-center">
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
                  {/* <Grid xs={12} className="flex justify-center">
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
                   </Grid> */}
                </Box>
              </Grid>
              <Grid className="hidden xl:flex items-center justify-center">
                <div className="h-full bg-greyLine w-0.5 2xl:mx-8 mx-4"></div>
              </Grid>

              <Grid item container xs={8} spacing={4} direction={"column"}>
                {isLoading ? (
                  <Box style={{display: 'flex', width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
                  <p className=" text-primaryPink font-bold font-poppins text-xl px-6 py-4">
                    Loading...
                  </p>
                  </Box>
                ) : currentPageData?.length === 0 ? (
                  <Box style={{display: 'flex', width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
                  <p className=" text-primaryPink font-bold font-poppins text-xl px-6 py-4">
                    No results found
                  </p>
                  </Box>
                ) : (
                  <>
                    {currentPageData?.map((alumni, index) => (
                      <Grid item key={index}>
                        <AlumniCard
                          rank={user?.basic?.rank}
                          name={alumni.name}
                          batch={alumni.batch}
                          branch={_.toUpper(alumni.branch)}
                          position={_.startCase(alumni.position)}
                          company={alumni.companyName}
                          imageSrc={alumni.profilePicURL}
                          userId={alumni.userID}
                        />
                      </Grid>
                    ))}
                    <Grid item>
                      <Grid
                        container
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
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
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
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
    </>
  );
};

export default AlumniListing;