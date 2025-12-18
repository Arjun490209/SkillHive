import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import {FaStar} from 'react-icons/fa6'
const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const fetchCourseData = async () => {
    courseData.map((course) => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
        console.log(selectedCourse);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseData]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-5 relative">
        {/* top section  */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* thumbnail */}
          <div className="w-full md:w-1/2">
            <FaArrowLeftLong
              onClick={() => navigate("/")}
              className="text-black w-5 h-5 cursor-pointer hover:text-gray-600"
            />
            <div className="w-full aspect-video">
              {selectedCourse?.thumbnail ? (
                <img
                  src={selectedCourse.thumbnail}
                  alt=""
                  className="w-full h-full object-cover rounded-xl border"
                />
              ) : (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover rounded-xl border"
                />
              )}
            </div>
          </div>

          {/* course Info  */}
          <div className="flex-1 space-y-2 mt-5">
            <h1 className=" text-2xl font-bold">{selectedCourse?.title}</h1>
            <p className=" text-gray-600">{selectedCourse?.subTitle}</p>

            <div className="flex items-start flex-col justify-between">
              <div className="text-amber-300 flex gap-2">
                <span className="flex items-center justify-start gap-1"> <FaStar/> 5</span>
                <span className=" text-gray-400"> (1,200 Reviews)</span>
              </div>
              <div className="text-lg font-medium text-black">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
