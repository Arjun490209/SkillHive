import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import {ClipLoader} from 'react-spinners'

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });


  const categories = [
    "Web Development",
    "UI/UX Design",
    "Data Science",
    "App Development",
    "Ethical Hacking",
    "AI/ML",
    "Data Analytics",
    "AI Tools",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post('api/course/create', formData)
      console.log(result.data)
      
      toast.success("Course Create Successfully.")
      navigate("/courses")     
      
    } catch (error) {
      toast.error(error?.response?.data?.message || "create course error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-3 py-6 sm:p-6 md:p-8">
      <div className="max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black font-semibold mb-6"
        >
          <MdArrowBack size={22} />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Course
          </h1>
          
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Course Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter course title"
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:ring-2  focus:ring-black focus:border-black outline-none text-sm sm:text-base transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black outline-none text-sm sm:text-base bg-white transition"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2.5 sm:py-3 text-sm sm:text-base font-semibold flex justify-center items-center bg-black text-white border border-black rounded-md hover:bg-white hover:text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <ClipLoader size={22} color="white"/> : "Create Course"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
