import React from "react";
import { MdCastForEducation } from "react-icons/md";
import {SiOpenaccess} from 'react-icons/si'
import {FaSackDollar} from 'react-icons/fa6'
import {BiSupport} from 'react-icons/bi'
import {FaUsers} from 'react-icons/fa'

const Logos = () => {
  return (
    <div className="w-full min-h-[90px] flex justify-center items-center flex-wrap gap-4 md:mb-[50px]">
      <div className="flex justify-center items-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer">
        <MdCastForEducation className="w-8 h-8 fill-[#03394b] text-[#163f4b]" />
        20k+ Online Courses
      </div>

      <div className="flex justify-center items-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer">
        <SiOpenaccess className="w-8 h-8 fill-[#03394b] text-[#163f4b]" />
        Life Time Access
      </div>

      <div className="flex justify-center items-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer">
        <FaSackDollar className="w-8 h-8 fill-[#03394b] text-[#163f4b]" />
        Value for Money
      </div>

      <div className="flex justify-center items-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer">
        <BiSupport className="w-8 h-8 fill-[#03394b] text-[#163f4b]" />
        Life Time Support
      </div>
      <div className="flex justify-center items-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer">
        <FaUsers className="w-8 h-8 fill-[#03394b] text-[#163f4b]" />
        Community Support
      </div>
    </div>
  );
};

export default Logos;
