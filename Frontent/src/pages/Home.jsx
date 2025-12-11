import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
// import { useNavigate } from "react-router-dom";
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";

import searchPng1 from "../assets/ai.png";
import searchPng2 from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCourses from "../components/ExploreCourses";


const Home = () => {
  // const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />

        <img
          src={home}
          className=" object-cover md:object-fill w-full lg:h-full h-1/2"
          alt=""
        />

        <span className="lg:text-[60px] absolute md:text-4xl text-center lg:top-[10%] top-[15%] w-full flex justify-center items-center text-white font-bold text-2xl capitalize">
          Grow your skills to advance your career
        </span>
        <span className="lg:text-[60px] absolute md:text-4xl text-center lg:top-[18%] top-[23%] w-full flex justify-center items-center text-white font-bold text-2xl capitalize">
          Your career path starts here
        </span>

        <div className="absolute lg:top-[30%] md:top-[80%] top-[75%] w-full flex justify-center items-center gap-3 flex-wrap">
          {/* Button 1 */}
          <button
            className="px-5 py-2.5 border-2   lg:border-white border-black bg-white lg:bg-black text-black lg:text-white text-lg font-light flex gap-2 cursor-pointer rounded-lg"
          >
            View All Courses
            <SiViaplay className="w-7 h-7 fill-black lg:fill-white" />
          </button>

          {/* Button 2 */}
          <button
            className="px-5 py-2.5 border-2 border-black lg:border-black bg-black lg:bg-white text-white lg:text-black text-lg font-light flex gap-2 cursor-pointer rounded-lg"
          >
            Search With AI
            <img src={searchPng1} alt="" className="w-7 h-7 rounded-full hidden lg:block" />
            <img src={searchPng2} alt="" className="w-7 h-7 rounded-full lg:hidden " />
          </button>
        </div>

        {/* <div onClick={()=>{navigate("/forget-password")}} className=" absolute top-20 left-8 cursor-pointer text-center text-blue-500 underline"> 
        forget password
      </div> */}
      
      </div>
      <Logos />
      <ExploreCourses/>
    </div>
  );
};

export default Home;
