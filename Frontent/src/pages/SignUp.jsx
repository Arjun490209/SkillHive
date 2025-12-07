import React, { useState } from "react";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setIsLoading(true);
    // Add your sign-up logic here
    try {
      const result = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        role,
      });
      toast.success("Signup Successful! Please login.");
      dispatch(setUserData(result.data));
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 500);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(
        error.response.data.message || "Signup Failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-200">
      <form
        className="w-[90%] md:w-200 h-150 bg-white rounded-2xl shadow-lg flex "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* left div */}
        <div className="md:w-[50%] w-[100%] h-[100%] rounded-l-2xl flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="font-semibold text-black text-2xl">
              Let's get started
            </h1>
            <h2 className="text-gray-600 text-[18px]">Create your account</h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="name" className="font-semibold text-black">
              {" "}
              Name
            </label>
            <input
              type="text"
              name="Fullname"
              autoComplete="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              id="name"
              className="border w-full h-9 border-[#e7e6e6] text-[15px] px-5 "
              placeholder="Enter Your Name"
            />

            <label htmlFor="email" className="font-semibold text-black">
              {" "}
              Email
            </label>
            <input
              type="email"
              name=""
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
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
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                id="password"
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
          <div className=" flex md:w-[50%] w-[70%] items-center justify-between">
            <span
              className={`px-4 py-1 rounded-sm border-2 border-[#e7e6e6] cursor-pointer ${
                role === "student" ? "border-gray-600" : ""
              }`}
              onClick={() => setRole("student")}
            >
              Student
            </span>
            <span
              className={`px-4 py-1 rounded-sm border-2 border-[#e7e6e6] cursor-pointer ${
                role === "educator" ? "border-gray-600" : ""
              }`}
              onClick={() => setRole("educator")}
            >
              Educator
            </span>
          </div>
          <button
            type="submit"
            className="w-[75%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px] "
            disabled={isLoading}
            onClick={handleSignup}
          >
            {isLoading ? <CircleLoader color="#ffffff" size={24} /> : "Sign Up"}
          </button>
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
                navigate("/login");
              }}
            >
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:text-blue-800">
                Log in
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

export default SignUp;
