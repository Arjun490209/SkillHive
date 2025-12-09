import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ! step 1 => enter email
  const sendOtpToEmail = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/auth/sendOtp", { email });
      console.log(result.data);

      setStep(2);
      toast.success(result.data.message || "OTP sent to your email");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
      setIsLoading(false);
    }
  };

  // ! step 2 => enter otp
  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const result = await axios.post("/api/auth/verifyOtp", { email, otp });

      console.log(result.data);
      setStep(3);
      toast.success(result.data.message || "OTP verified successfully");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to verify OTP");
      setIsLoading(false);
    }
  };
  // ! step 3 => reset password
  const resetPassword = async () => {
    setIsLoading(true);
    if (newPassword !== confirmNewPassword) {
      setIsLoading(false);
      return toast.error("Passwords do not match");
    }
    try {
      const result = await axios.post("/api/auth/resetPassword", {
        email,
        newPassword,
      });

      console.log(result.data);
      toast.success(result.data.message || "OTP sent to your email");
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 px-4">
      {/* STEP 1: Enter Email */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forgot Your Password
          </h2>

          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="your@gmail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onClick={sendOtpToEmail}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2 text-white">
                  <ClipLoader size={20} className="text-white"/>
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer font-semibold text-gray-600 hover:text-gray-800"
            onClick={() => {
              navigate("/login");
            }}
          >
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

          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
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
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              required
              placeholder="Enter your OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onClick={verifyOtp}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <ClipLoader size={20} className="fill-white"/>
                  Verifying OTP...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer font-semibold text-gray-600 hover:text-gray-800"
            onClick={() => {
              navigate("/login");
            }}
          >
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
          <p className="text-sm text-gray-500 text-center mb-6">
            {" "}
            Enter a new Password below to regain access to your account.
          </p>
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="text"
              name=""
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
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
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
              id="confirm-new-password"
              required
              placeholder="Enter your confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium cursor-pointer"
              onClick={resetPassword}
            >
              {isLoading ? (
                <span className="flex fill-white items-center justify-center gap-2">
                  <ClipLoader size={20} />
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4 cursor-pointer font-semibold text-gray-600 hover:text-gray-800"
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
