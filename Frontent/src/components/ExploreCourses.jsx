import React from "react";
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { FaHackerrank } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa";
import { MdAppShortcut } from "react-icons/md";
import { SiOpenai, SiGoogledataproc } from "react-icons/si";
import { AiOutlineOpenAI } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'

const ExploreCourses = () => {
  const navigate = useNavigate()
  const cards = [
    {
      icon: <TbDeviceDesktopAnalytics className="w-8 h-8 text-[#444]" />,
      label: "Web Dev",
      bg: "from-[#fde2ff] to-[#fcd3ff]",
    },
    {
      icon: <LiaUikit className="w-8 h-8 text-[#444]" />,
      label: "UI/UX Designing",
      bg: "from-[#b4f5d0] to-[#9ff3c5]",
    },
    {
      icon: <MdAppShortcut className="w-8 h-8 text-[#444]" />,
      label: "App Dev",
      bg: "from-[#d6b1ff] to-[#cba0ff]",
    },
    {
      icon: <FaHackerrank className="w-8 h-8 text-[#444]" />,
      label: "Ethical Hacking",
      bg: "from-[#c9ffb3] to-[#b2ffa2]",
    },
    {
      icon: <SiOpenai className="w-8 h-8 text-[#444]" />,
      label: "AI/ML",
      bg: "from-[#a5e9ff] to-[#8edfff]",
    },
    {
      icon: <SiGoogledataproc className="w-8 h-8 text-[#444]" />,
      label: "Data Science",
      bg: "from-[#ffc8d9] to-[#ffb5ca]",
    },
    {
      icon: <FaDatabase className="w-8 h-8 text-[#444]" />,
      label: "Data Analytics",
      bg: "from-[#c4d7ff] to-[#b0c8ff]",
    },
    {
      icon: <AiOutlineOpenAI className="w-8 h-8 text-[#444]" />,
      label: "AI Tools",
      bg: "from-[#7bff8f] to-[#60ff78]",
    },
  ];

  return (
    <div className="w-screen min-h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6 py-10">
      {/* Left Section */}
      <div className="w-full lg:w-[350px] flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-4">
        <span className="text-4xl font-semibold leading-tight">Explore</span>
        <span className="text-4xl font-semibold leading-tight">
          Our Courses
        </span>
        <p className="text-[15px] mt-3 text-gray-600 leading-relaxed">
          Build your skills with our expert-led courses crafted to help you grow
          in the tech world.
        </p>

        <button className="px-6 py-3 border-2 bg-black text-white rounded-xl text-[17px] font-light flex items-center gap-2 mt-8 cursor-pointer hover:bg-gray-900 transition-all duration-200" onClick={()=>{navigate("/all-courses")}}>
          Explore Courses <SiViaplay className="w-6 h-6" />
        </button>
      </div>

      {/* Right Cards Section */}
      <div className="w-full max-w-[900px] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
        {cards.map((item, i) => (
          <div
            key={i}
            className="w-[130px] h-40 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <div
              className={`w-full h-[105px] rounded-xl bg-gradient-to-r ${item.bg} shadow-md flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <span className="text-[15px] font-medium text-gray-700">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
