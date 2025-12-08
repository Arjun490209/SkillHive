import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(3);
  // const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  // const [newPassword, setNewPassword] = useState("");

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
      {/* STEP 1: Enter Email */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forgot Your Password
          </h2>

          <form action="" className="flex flex-col gap-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your email address
            </label>
            <input
              type="text"
              name=""
              id="email"
              required
              placeholder="your@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium cursor-pointer">Send OTP</button>
          </form>
        <div className="text-sm text-center mt-4 cursor-pointer font-semibold text-gray-600 hover:text-gray-800" onClick={()=>{navigate('/login')}}>
          Back to Login
        </div>
         
        </div>
      )}

      {/* STEP 2: Enter OTP */}
      {step === 2 && (
         <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>

          <form action="" className="flex flex-col gap-4">
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 "
            >
              Please enter the 4 digit OTP sent to your email.
            </label>
            <input
              type="text"
              name=""
              id="otp"
              required
              placeholder="Enter your OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium cursor-pointer">Verify OTP</button>
          </form>
        <div className="text-sm text-center mt-4 cursor-pointer font-semibold text-gray-600 hover:text-gray-800" onClick={()=>{navigate('/login')}}>
          Back to Login
        </div>
         
        </div>
      )}

      {/* STEP 3: Reset Password */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>
        <p className="text-sm text-gray-500 text-center mb-6"> Enter a new Password below to regain access to your account.</p>
          <form action="" className="flex flex-col gap-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="text"
              name=""
              id="new-password"
              required
              placeholder="Enter your new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
             <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="text"
              name=""
              id="confirm-new-password"
              required
              placeholder="Enter your confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium cursor-pointer">Reset Password</button>
          </form>
        <div className="text-sm text-center mt-4 cursor-pointer font-semibold text-gray-600 hover:text-gray-800" onClick={()=>{navigate('/login')}}>
          Back to Login
        </div>
         
        </div>
      )}
    </div>
  );
};

export default Profile;
