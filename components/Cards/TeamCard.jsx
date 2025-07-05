import React from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
// import Link from "next/link";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import {Stack} from '@mui/material'

export default function TeamCard({Image, name, data2, data3, linkLinkedin, linkInsta, linkX}) {
  return (
    <div className="pt-12">
    <CardContainer className="inter-var" >
      <CardBody className="bg-gray-50 py-0 group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-72 h-auto rounded-xl p-6  border">
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 ">
          {name}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {data2}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={Image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
       <Stack justifyContent='space-between' style={{marginTop: '2rem'}}>
       {/* <CardItem
            translateZ={20}
            target="__blank"
            className="py-2 rounded-xl text-md font-normal dark:text-white"
          >
            {data3}
          </CardItem> */}
        <div className="flex justify-between items-center" >
          <CardItem
            translateZ={20}
            target="__blank"
            className="rounded-xl text-xs font-normal "
          >
            <a href={linkLinkedin} target="_blank" rel="noReferrer" className="icon"><AiFillLinkedin style={{fontSize:'41px', margin: '0px 5px'}}/></a>
          </CardItem>
          <CardItem
            translateZ={20}
            target="__blank"
            className=" rounded-xl text-xs font-normal "
          >
            <a href={linkInsta} target="_blank" rel="noReferrer" className="" ><FaSquareInstagram style={{fontSize:'36px', margin: '0px 5px'}} /></a>
          </CardItem>
          <CardItem
            translateZ={20}
            target="__blank"
            className=" rounded-xl text-xs font-normal "
          >
            <a href={linkX} target="_blank" rel="noReferrer" className="icon"><FaSquareXTwitter style={{fontSize:'36px', margin: '0px 5px'}} /></a>
          </CardItem>
        </div>
        </Stack>
      </CardBody>
    </CardContainer>
    </div>
  );
}
