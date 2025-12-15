import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import searchPng1 from "../assets/ai.png";
import searchPng2 from "../assets/SearchAi.png";
import Logos from "../components/Logos";
import ExploreCourses from "../components/ExploreCourses";
import CardPage from "../components/CardPage";
import Footer from "../components/Footer";


const Home = () => {
const navigate = useNavigate()
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />

        <img
          src={home}
          className="object-cover md:object-fill w-full lg:h-full h-1/2"
          alt=""
        />

        <span className="absolute top-[15%] md:top-[10%] lg:top-[10%] w-full text-center text-white font-bold capitalize text-2xl md:text-4xl lg:text-[60px] flex justify-center">
          Grow your skills to advance your career
        </span>

        <span className="absolute top-[23%] md:top-[18%] lg:top-[18%] w-full text-center text-white font-bold capitalize text-2xl md:text-4xl lg:text-[60px] flex justify-center">
          Your career path starts here
        </span>

        {/* Buttons */}
        <div className="absolute top-[75%] md:top-[80%] lg:top-[30%] w-full flex justify-center items-center gap-3 flex-wrap">
          {/* Button 1 */}
          <button className="px-5 py-2.5 border-2 border-black lg:border-white bg-white lg:bg-black text-black lg:text-white text-lg font-light flex gap-2 items-center rounded-lg cursor-pointer" onClick={()=>{navigate("/all-courses")}}>
            View All Courses
            <SiViaplay className="w-7 h-7 fill-black lg:fill-white" />
          </button>

          {/* Button 2 */}
          <button className="px-5 py-2.5 border-2 border-black bg-black lg:bg-white text-white lg:text-black text-lg font-light flex gap-2 items-center rounded-lg cursor-pointer">
            Search With AI
            <img
              src={searchPng1}
              alt=""
              className="w-7 h-7 rounded-full hidden lg:block"
            />
            <img
              src={searchPng2}
              alt=""
              className="w-7 h-7 rounded-full lg:hidden"
            />
          </button>
        </div>
      </div>

      {/* Logos Section */}
      <Logos />

      {/* Course Section */}
      <ExploreCourses />

      <CardPage />

      <Footer/>
    </div>
  );
};

export default Home;
