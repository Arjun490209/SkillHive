import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { setUserData } from "../redux/userSlice.js";

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get("/api/auth/logout");
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error?.response?.data || error.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* ===== Main Navbar Wrapper ===== */}
      <div className="w-full h-16 fixed top-0 left-0 px-3 sm:px-5 py-2 flex items-center justify-between bg-[#00000047] backdrop-blur-md z-10">
        {/* ===== Logo Section ===== */}
        <div className="w-[40%] sm:w-[25%] lg:w-[20%] flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-10 sm:w-12 lg:w-14 rounded-sm border"
          />
        </div>

        {/* ===== Desktop Right Section ===== */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Profile Icon (if user not logged in) */}
          {!userData && (
            <IoPersonCircle
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 fill-black cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}

          {/* User Initial (if user logged in) */}
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt=""
              className="w-10 h-10 rounded-full sm:w-11 sm:h-11 flex items-center justify-center text-base sm:text-lg cursor-pointer border border-white"
              onClick={()=>setShow(prev=>!prev)}
            />
          ) : (
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-black text-white rounded-full text-base sm:text-lg cursor-pointer border border-white"
              onClick={()=>setShow(prev=>!prev)}
            >
              {userData?.name?.slice(0, 1).toUpperCase() || "U"}
            </div>
          )}

          {/* Dashboard Button (only for educator role) */}
          {userData?.role === "educator" && (
            <div className="hidden sm:block px-3 sm:px-4 py-2 bg-black text-white rounded-lg text-sm sm:text-base cursor-pointer border border-white">
              Dashboard
            </div>
          )}

          {/* Login / Logout Button */}
          {!userData ? (
            <span
              className="px-3 sm:px-4 py-2 bg-black text-white border-white border-2 rounded-lg text-sm sm:text-base cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="px-3 sm:px-4 py-2 bg-white text-black rounded-lg text-sm sm:text-base cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}

          {/* ===== Profile Dropdown Menu ===== */}
          {show && (
            <div className="absolute top-[110%] right-[15%] flex flex-col gap-2 text-lg rounded-md bg-white px-4 py-2.5 border-2 border-black transition-all duration-300">
              <span
                className="bg-black text-white px-7 py-2.5 rounded-2xl hover:bg-gray-600 cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                My Profile
              </span>
              <span className="bg-black text-white px-7 py-2.5 rounded-2xl hover:bg-gray-600 cursor-pointer">
                My Courses
              </span>
            </div>
          )}
        </div>

        {/* ===== Hamburger Icon (Mobile) ===== */}
        <RxHamburgerMenu
          className="w-7 h-7 lg:hidden fill-gray-200 text-gray-200 hover:text-red-500 cursor-pointer hover:fill-gray-600 transition-all duration-300"
          onClick={() => setShowHam((prev) => !prev)}
        />

        {/* ===== Mobile Full Screen Menu ===== */}
        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden
        transition-all duration-700 ease-in-out
        ${
          showHam
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }
      `}
        >
          {/* Close Icon */}
          <GiSplitCross
            onClick={() => setShowHam((prev) => !prev)}
            className="w-7 h-7 absolute top-5 right-3 fill-white cursor-pointer hover:fill-gray-400"
          />

          {/* Profile Icon (if user not logged in) */}
          {!userData && (
            <IoPersonCircle className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 fill-black cursor-pointer" />
          )}

          {/* User Initial (if user logged in) */}
          {userData?.photoUrl ? (
            <img
              src={userData.photoUrl}
              alt=""
              className="w-10 h-10 rounded-full sm:w-11 sm:h-11 flex items-center justify-center text-base sm:text-lg cursor-pointer border border-white"
            />
          ) : (
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-black text-white rounded-full text-base sm:text-lg cursor-pointer border border-white"
            >
              {userData?.name?.slice(0, 1).toUpperCase() || "U"}
            </div>
          )}

          {/* Profile Menu Items */}
          <div
            className="w-52 h-14 flex justify-center items-center bg-black text-white rounded-lg cursor-pointer"
            onClick={() => {
              navigate("/profile");
            }}
          >
            My Profile
          </div>

          <div className="w-52 h-14 flex justify-center items-center bg-black text-white rounded-lg cursor-pointer">
            My Courses
          </div>

          {/* Dashboard Button (only for educator) */}
          {userData?.role === "educator" && (
            <div className="w-52 h-14 flex justify-center items-center bg-black text-white rounded-lg cursor-pointer">
              Dashboard
            </div>
          )}

          {/* Login / Logout Button */}
          {!userData ? (
            <span
              className="w-52 h-14 flex justify-center items-center bg-black text-white rounded-lg cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          ) : (
            <span
              className="w-52 h-14 flex justify-center items-center bg-black text-white rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
