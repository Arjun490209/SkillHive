import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import {setUserData} from "../redux/userSlice";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("photoUrl", photoUrl);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/user/profile", formData);
      setLoading(false);
      dispatch(setUserData(result.data));
      toast.success("Profile Update Data");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || "Profile Update Failed");
    }
  };

  return (
    <div className="min- h-screen bg-gray-100 px-4 py-10 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative">
        <FaArrowLeftLong
          className=" absolute left-6 top-6 cursor-pointer"
          onClick={() => {
            navigate("/profile");
          }}
        />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>
        <form
          action=""
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col items-center justify-center text-center">
            {userData?.photoUrl ? (
              <img
                src={userData?.photoUrl}
                className="w-24 h-24 rounded-full object-cover border-4 border-black"
                alt=""
              />
            ) : (
              <div className="w-24 h-24 rounded-full text-white flex justify-center items-center text-3xl border-2 bg-black border-white">
                {userData?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-gray-700"
            >
              Select Avatar
            </label>
            <input
              type="file"
              id="image"
              name="photoUrl"
              onChange={(e) => {
                setPhotoUrl(e.target.files[0]);
              }}
              placeholder="Photo Url"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              User Name
            </label>
            <input
              type="text"
              id="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder={userData.name}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              readOnly
              placeholder={userData.email}
              className="w-full px-4 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              name="description"
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              placeholder="Tell us about yourself"
              rows={3}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-black"
            />
          </div>
          <button
            className="w-full bg-black active:bg-[#4b4b4b] text-white py-2 rounded-md font-medium transition cursor-pointer"
            disabled={loading}
            onClick={handleUpdateProfile}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
