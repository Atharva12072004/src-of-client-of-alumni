import { BorderButton, PrimaryButton } from "./Buttons";
import Location from "../assets/Components/Cards/Location.svg";
import StartDate from "../assets/Components/Cards/StartDate.svg";
import Stipend from "../assets/Components/Cards/Stipend.svg";
import Batch from "../assets/Components/Cards/Batch.svg";
import Clock from "../assets/Components/Cards/Clock.svg";
import Applicants from "../assets/Components/Cards/Applicants.svg";
import Bgnewscard1 from "../assets/Components/Cards/Bgnewscard1.svg";
import {toast} from "react-toastify";
const _ = require('lodash');
//const ProjectCard = (props) => {
//  return (
//    <div className="flex justify-center">
//      <section
//        className="flex flex-col text-wrap my-2 p-4 rounded-lg shadow-md bg-white-100 w-11/12
//      md:grid md:grid-cols-3 md:grid-rows-5 md:w-7/12"
//      >
//        <div className="md:grid md:col-span-1 md:row-span-5 md:gap-1">
//          <i className="text-xs font-semibold text-yellow-400">
//            {props.developmentGenre}
//          </i>
//          <p className=" text-md font-bold text-black-800">
//            {props.projectTitle}
//          </p>
//          <p className="text-gray-700">By: {props.handlerName}</p>
//          <p className="text-gray-700">{props.techStack}</p>
//          <div className=" flex m-1">
//            <img src={Applicants} alt="applicants" className="w-4 h-4 m-1" />
//            {props.applicants}
//          </div>
//        </div>
//        <p className="md:grid md:col-span-2 md:row-span-1"></p>
//        <p className="md:grid md:col-span-2 md:row-span-5">
//          {props.description}
//        </p>
//        <div className=" flex justify-center mt-2 md:flex md:col-span-3 md:justify-end">
//          <PrimaryButton name="APPLY" />
//          <BorderButton name="Handler Profile" />
//        </div>
//      </section>
//    </div>
//  );
//};

const JobsCard = (props) => {
  const rank=props.rank;
  const shouldBlur = (value) =>{
    if(rank == -1 && value != 'jobPosition')
      return 'blur-sm';
    else if(rank == 3 && value == 'postedBy')
      return 'blur-sm';
    return '';
  }

  return (
    <>
      <div className="flex " style={{ maxWidth: "1200px", minWidth: "1000px" }}>
        <div
          className=" text-wrap rounded-md shadow-md bg-white w-11/12
        sm:w-7/12 pt-3 pb-3 pr-3 pl-3"
        >
          <div>
            <p className=" px-2 font-bold text-xl text-gray-800 ">
              {props.jobPosition}
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
            <img src={Clock} alt="Posted By" className="w-4 h-4 m-1" />
            <p>Posted: {props.posted}</p>
          </div>
          <div className="sm:grid sm:grid-cols-4 sm:grid-rows-2 hidden">
            <div className="flex items-start m-2 ml-3 text-sm sm:ml-2">
              <img src={StartDate} alt="Start Date" className="w-4 h-4 m-1  " />
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

            <p className={`ml-8 ${shouldBlur('startDate')}`}>{props.startDate}</p>
            <p className={`ml-8 ${shouldBlur('stipend')}`}>₹{props.stipend}</p>
            <div className={`ml-8 ${shouldBlur('batch')}`}>
              {props.batch.map((item, index) => (
                <span key={index}>
                  {index > 0 && ','} {item}
                </span>
              ))}
            </div>
            <p className={`ml-8 ${shouldBlur('postedBy')}`}>{props.postedBy}</p>
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
              <p className={`ml-2 ${shouldBlur('startDate')}`}>{props.startDate}</p>
            </div>
            <div className="flex items-center m-2 ml-3">
              <img src={Stipend} alt="Stipend" className="w-4 h-4" />
              <p className="hidden sm:block">Stipend</p>
              <p className={`ml-2 ${shouldBlur('stipend')}`}>{props.stipend}</p>
            </div>
            <div className="flex items-center m-2 ml-3">
              <img src={Batch} alt="Batch" className="w-4 h-4" />
              <p className="hidden sm:block">Batch</p>
              <p className={`ml-2 ${shouldBlur('batch')}`}>{props.batch}</p>
            </div>
            <div className="flex items-center m-2 ml-3 ">
              <img src={Clock} alt="Posted By" className="w-4 h-4" />
              <p className="hidden sm:block">Posted By</p>
              <p className={`ml-2 ${shouldBlur('postedBy')}`}>{props.postedBy}</p>
            </div>
            <div className=" flex items-center m-2 ml-3 sm:hidden ">
              <img src={Clock} alt="posted at" className="w-4 h-4  " />
              <p className="ml-2">{props.posted}</p>
            </div>
          </div>

          <div className="flex justify-evenly">
            {rank==0||rank==1||rank==2? <PrimaryButton onClick={() => toast.error('Login from acpce account to apply')} name="Apply" isDisabled={false} /> : <PrimaryButton name="Apply" isDisabled={true} /> }
            <div className="hidden md:block">
              <BorderButton name="Request for Referal" />
            </div>
            <div className="md:hidden">
              <BorderButton name="Referal" />
            </div>
            <div className="hidden md:block">
              <BorderButton name="View Profile" />
            </div>
            <div className="md:hidden">
              <BorderButton name="Profile" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NewsCard = (props) => {
    const rank=props.rank;
    const shouldBlur = (value) =>{
      if(rank == -1 && value != 'jobPosition')
        return 'blur-sm';
      else if(rank == 3 && value == 'postedBy')
        return 'blur-sm';
      return '';
    }

  const link = props.link ? props.link : "https://www.google.co.in/";
  return (
    <a href={link}>
    <div className="my-10 m-auto rounded-2xl sm:w-3/4 w-11/12 overflow-hidden">
       
      <div
        className="relative rounded-2xl bg-cover p-4  bg-opacity-100"
        style={{
          backgroundImage: `url(${
            Bgnewscard1
          })`,
        }}
      >
        <div className="absolute top-0 left-0 size-full bg-black/40"></div>
        <div className="lg:mr-48 sm:ml-5 mb-5 relative">
        <h3 className="text-3xl  font-normal text-white">
          {props.title}
        </h3>
        <p className="text-gray-200  font-thin text-sm pt-5">
          {props.description}
        </p>
        {props.tags? 
        (<div className="flex mt-4 gap-4">
          {props.tags.map((tag, index) => (
            <span
              key={index}
              className="text-md border p-4 md:max-h-8 flex place-items-center rounded-2xl text-white"
            >
              {tag}
            </span>
          ))}
        </div>) : null}
        </div>
        
      </div>

    </div>
</a>
  );
};

const AlumniCard = (props) => {
  return (
    <>
    <div className="md:flex hidden md:justify-evenly">
    <div className="p-4 shadow-md rounded-md grid grid-cols-6 grid-rows-4 gap-x-3 w-full ">
  <img
    src="https://picsum.photos/536/354"
    alt={props.name}
    className="row-start-1 col-span-1 row-span-4 h-20 w-20 rounded-full"
  />

        <div
          className="row-start-1  col-span-3 row-span-2 flex items-center mb-4 justify-start text-2xl font-bold
    "
        >
          {props.name}
        </div>
        <div className="row-start-3 col-span-3 row-span-1 flex items-center   ">
          <span className="mr-2 font-thin text-sm ">
            {props.batch} || {props.branch}
          </span>
        </div>
        <div className="row-start-4  col-span-3 row-span-1 flex items-center  ">
          <span className="mr-2 font-thin text-sm ">
            {props.position} || at {props.company}
          </span>
        </div>

        <div className=" col-span-2 row-span-4 justify-center place-items-center row-start-1 flex">
          <BorderButton name="View Profile" />
          <div />
        </div>
      </div>
    </div>


<div className="flex md:hidden justify-end">
<div className="p-4 shadow-md rounded-md grid grid-cols-6 grid-rows-5 gap-x-3">
  
  <div className="row-start-1 col-span-2 row-span-5">
  <img
    src="https://picsum.photos/536/354"
    alt={props.name}
    className="row-start-1 col-span-2 row-span-4 h-16 w-28 rounded-full"
  />
  <div className="flex place-items-end">
  <BorderButton name="Profile" />
  </div>
  </div>

 
  <div className="row-start-1 col-start-3 col-span-4 row-span-5">
<p className=" text-lg font-semibold"> {props.name}</p>
<p className=" font-thin text-sm"> {props.batch}</p>
<p className=" font-thin text-sm"> {props.branch}</p>
<p className=" font-thin text-sm"> {props.position}</p>
<p className=" font-thin text-sm"> {props.company}</p>

    </div>

  {/* <div className="col-span-2 row-span-4 justify-center place-items-center row-start-1 flex">
    <BorderButton name="View Profile" />
    <div /> */}
  {/* </div> */}
</div>
</div>
    </>

  );
};

export { JobsCard, NewsCard, AlumniCard };

