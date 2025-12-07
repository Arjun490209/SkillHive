import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import {toast} from 'react-toastify'
import { setUserData } from "../redux/userSlice.js";

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const result = await axios.get("/api/auth/logout");
      dispatch(setUserData(null));
      console.log(result.data)
      toast.success(result.response.data.message);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <div className="w-full h-16 fixed top-0 left-0 px-3 sm:px-5 py-2 flex items-center justify-between bg-[#00000047] backdrop-blur-md z-10">
        {/* Logo Section */}
        <div className="w-[40%] sm:w-[25%] lg:w-[20%] flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-10 sm:w-12 lg:w-14 rounded-sm border"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Profile icon */}
          {!userData && (
            <IoPersonCircle className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 fill-black cursor-pointer" />
          )}

          {/* User Initial */}
          {userData && (
            <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-black text-white rounded-full text-base sm:text-lg cursor-pointer">
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}

          {/* Dashboard Button */}
          {userData?.role === "educator" && (
            <div className="hidden sm:block px-3 sm:px-4 py-2 bg-black text-white rounded-lg text-sm sm:text-base cursor-pointer">
              Dashboard
            </div>
          )}

          {/* Login / Logout Button */}
          {!userData ? (
            <span className="px-3 sm:px-4 py-2 bg-black text-white rounded-lg text-sm sm:text-base cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          ) : (
            <span className="px-3 sm:px-4 py-2 bg-white text-black rounded-lg text-sm sm:text-base cursor-pointer" onClick={handleLogout}>
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
