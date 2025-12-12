import React from "react";
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const Logos = () => {
  const items = [
    { icon: <MdCastForEducation className="w-7 h-7 text-[#055065]" />, label: "20k+ Online Courses" },
    { icon: <SiOpenaccess className="w-7 h-7 text-[#055065]" />, label: "Life Time Access" },
    { icon: <FaSackDollar className="w-7 h-7 text-[#055065]" />, label: "Value for Money" },
    { icon: <BiSupport className="w-7 h-7 text-[#055065]" />, label: "Life Time Support" },
    { icon: <FaUsers className="w-7 h-7 text-[#055065]" />, label: "Community Support" },
  ];

  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-4 md:gap-6 py-6 md:mb-10">

      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-3xl cursor-pointer bg-[#e8f3f7] shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.05]">

          {item.icon}
          <span className="font-medium text-[15px] text-[#03394b]">
            {item.label}
          </span>
        </div>
      ))}

    </div>
  );
};

export default Logos;
