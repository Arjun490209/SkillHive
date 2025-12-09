import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />
      </div>

      <div onClick={()=>{navigate("/forget-password")}} className=" absolute top-20 left-8 cursor-pointer text-center text-blue-500 underline"> 
        forget password
      </div>
    </div>
  );
};

export default Home;
