import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { get_fetcher } from "../utils/Fetcher";
import { JobsFilterButton } from "../components/jobsFilterButton";
import Navbar from "../template/Navbar";
import Footer from "../template/Footer";
import NewsCard from "../components/Cards/NewsCard";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/User";
import {Typography, Pagination, Box} from "@mui/material";
import {fetcherGet} from "../utils/axiosAPI";

const NewsHub = () => {
  const user = useRecoilValue(userAtom);

const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true); // Start loading
      try {
        const url = "/news/getAll";
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


  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const cardsPerPage = 3; // Adjust this value based on your desired number of cards per page

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  useEffect(() => {
    if (data) {
      console.log("Data: ", data);
    }
  }, [isLoading, data]);

  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    scholarships: false,
    event: false,
    ecell: false,
    cultural: false,
    competition: false,
  });

  useEffect(() => {
    if (!data) return;

    let filteredJobs = data.filter((news) => {
      if (filters.scholarships && !news.tags.includes("Scholarships"))
        return false;
      if (filters.event && !news.tags.includes("Event")) return false;
      if (filters.ecell && !news.tags.includes("E-Cell")) return false;
      if (filters.cultural && !news.tags.includes("Cultural")) return false;
      if (filters.competition && !news.tags.includes("Competition"))
        return false;
      return true;
    });

    setFilteredData(filteredJobs);
  }, [data, filters]);

  const handleFilterClick = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  useEffect(() => {
    if (filteredData?.length < cardsPerPage) {
      setCurrentPageData(filteredData);
    } else {
      const startIndex = (currentPage - 1) * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      const newPageData = filteredData?.slice(startIndex, endIndex);
      setCurrentPageData(newPageData);
    }
  }, [filteredData, currentPage, cardsPerPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); // Optionally scroll to the top of the page when changing pages
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
      <Navbar />
      <div className="hidden sm:block">
        <p className="mt-32"></p>
        <div className="glass-effect rounded-2xl p-6 shadow-pink-glow flex justify-center mx-4">
          <div className="flex font-bold items-center justify-center">
            <div className="items-center">
              <img
                src="/filter_icon.svg"
                alt="filter-icon"
                className="mt-1.5 mr-1 h-6"
              />
            </div>
            <div className="mr-2 text-2xl items-center">Filter</div>
          </div>

          <div onClick={() => handleFilterClick("ecell")}>
            <JobsFilterButton name="E-Cell" used={filters.ecell} />
          </div>

          <div onClick={() => handleFilterClick("event")} className="">
            <JobsFilterButton name="Event" used={filters.event} />
          </div>

          <div onClick={() => handleFilterClick("cultural")} className="">
            <JobsFilterButton name="Cultural" used={filters.cultural} />
          </div>

          <div onClick={() => handleFilterClick("competition")} className="">
            <JobsFilterButton name="Competition" used={filters.competition} />
          </div>

          <div onClick={() => handleFilterClick("scholarships")} className="">
            <JobsFilterButton name="Scholarships" used={filters.scholarships} />
          </div>
        </div>
      </div>

      <div className="sm:hidden block m-0 p-0">
        <p className="mt-24"></p>
        <div className="glass-effect rounded-2xl p-6 shadow-pink-glow grid grid-row-span-3 justify-center mx-4">
          <div className="flex font-bold items-center justify-center">
            <div className="items-center grid row-span-1">
              <img
                src="/filter_icon.svg"
                alt="filter-icon"
                className="mt-1.5 mr-1 h-6"
              />
            </div>
            <div className="mr-2 text-2xl items-center">Filter</div>
          </div>

          <div className="flex justify-evenly">
            <div onClick={() => handleFilterClick("ecell")}>
              <JobsFilterButton name="E-Cell" used={filters.ecell} />
            </div>

            <div onClick={() => handleFilterClick("event")} className="">
              <JobsFilterButton name="Event" used={filters.event} />
            </div>

            <div onClick={() => handleFilterClick("cultural")} className="">
              <JobsFilterButton name="Cultural" used={filters.cultural} />
            </div>
          </div>
          <div className="flex">
            <div onClick={() => handleFilterClick("competition")} className="">
              <JobsFilterButton name="Competition" used={filters.competition} />
            </div>

            <div onClick={() => handleFilterClick("scholarships")} className="">
              <JobsFilterButton
                name="Scholarships"
                used={filters.scholarships}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ml-3">
        {isLoading ? (
            <Box style={{display: 'flex', width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <p className="text-primaryPink font-bold font-poppins text-xl glass-effect rounded-xl p-4 shadow-pink-glow">
            Loading...
          </p>
            </Box>
        ) : currentPageData?.length === 0 ? (
            <Box style={{display: 'flex', width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <p className="text-primaryPink font-bold font-poppins text-xl glass-effect rounded-xl p-4 shadow-pink-glow">
            No results found
          </p>
            </Box>
        ) : (
          currentPageData.map((news, index) => (
            <div key={index} className="mb-14">
              <NewsCard
                rank={user?.basic?.isLoggedIn ? user?.basic?.rank : -1}
                title={news.title}
                tags={news.tags}
                tag1={news.tags[0]}
                tag2={news.tags[1]}
                tag3={news.tags[2]}
                description={news.description}
              />
            </div>
          ))
        )}
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
            size="medium"
            className="mt-10 flex justify-center"
          />
        )}
      </div>

      <Footer />
    </>
  );
};

export default NewsHub;
