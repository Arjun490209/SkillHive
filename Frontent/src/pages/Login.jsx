import React, { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import {CircleLoader} from 'react-spinners'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
    setIsLoading(true);
    // Add login logic here
    try {
      const result = await axios.post("/api/auth/login", {
        email,
        password,
      });
      toast.success("Login Successful!");
      console.log(result.data);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 500);
    } catch (error) {
      toast.error(
        error.response.data.message || "Login Failed. Please try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-200">
      <form className="w-[90%] md:w-200 h-150 bg-white rounded-2xl shadow-lg flex " onSubmit={(e)=>{e.preventDefault()}}>
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] rounded-l-2xl flex flex-col items-center justify-center gap-3">
            <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="font-semibold text-black text-2xl">
              Welcome Back
            </h1>
            <h2 className="text-gray-600 text-[18px]">Login in your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold text-black">
              {" "}
              Email
            </label>
            <input
              type="email"
              name=""
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              autoComplete="email"
              id="email"
              className="border w-full h-9 border-[#e7e6e6] text-[15px] px-5 "
              placeholder="your@email.com"
            />

              <label htmlFor="password" className="font-semibold text-black">
                {" "}
                Password
              </label>
            <div className=" relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name=""
                autoComplete="password"
                id="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                value={password}
                className="border w-full h-9 border-[#e7e6e6] text-[15px] px-5 "
                placeholder="Enter Your Password"
              />
              {showPassword ? (
                <IoIosEyeOff
                  className="absolute text-2xl top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <IoMdEye
                  className="absolute text-2xl top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>
          
          <button className="w-[75%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]" hidden={isLoading} onClick={handleLogin}>
            {isLoading ? <CircleLoader size={20} color={"#ffffff"} /> : "Login"}
          </button>
          <span className="text-sm cursor-pointer text-[#585757] hover:text-black">Forgot your Password?</span>
          <div className="w-[75%] flex justify-center items-center gap-2">
            <div className="w-[25%] h-0.5 bg-[#c4c4c4] "></div>
            <div className="w-[50%] text-sm text-[#a8a6a6] flex justify-center items-center">
              or continue
            </div>
            <div className="w-[25%] h-0.5 bg-[#c4c4c4] "></div>
          </div>
          <div className="w-[75%] h-10 cursor-pointer flex items-center justify-center rounded-[5px] border border-black">
            <img src={google} alt="Google" className="w-6" />
            <span className="text-[18px] text-gray-600">oogle</span>
          </div>
          <div className="w-[75%] flex justify-center items-center">
            <p
              className="text-sm font-semibold text-gray-500"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create new account?{" "}
              <span className="text-blue-600 cursor-pointer hover:text-blue-800">
                Sign Up
              </span>
            </p>
          </div>
        </div>
        {/* Right div */}
        <div className="w-[50%] h-[100%] rounded-r-2xl bg-black  md:flex flex-col hidden items-center justify-center ">
          <h1 className="text-white text-3xl font-bold mb-5">SkillHive</h1>
        </div>
      </form>
    </div>
  );
};

export default Login;
