import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import {  FaCirclePlay } from "react-icons/fa6";

const ViewLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((course) => course._id === courseId);
  const [creatorData, setCreatorData] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures[0] || null
  );

  useEffect(() => {
    const handleCreator = async () => {
      try {
        if (selectedCourse?.creator) {
          const result = await axios.post("/api/course/creator", {
            userId: selectedCourse?.creator,
          });
          console.log(result.data);
          setCreatorData(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleCreator();
  }, [selectedCourse]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col md:flex-row gap-3">
      {/* left or top */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold flex items-center justify-start gap-5 text-gray-700">
          <FaArrowLeftLong
            className=" text-black w-[22px] h-[22px] cursor-pointer"
            onClick={() => navigate(`/`)}
          />{" "}
          {selectedCourse?.title}
        </h2>
        <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
          <span>Category : {selectedCourse?.category}</span>
          <span>Level : {selectedCourse?.level}</span>
        </div>
        {/* video player */}
        <div className=" aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-200">
          {selectedLecture?.videoUrl ? (
            <video
              className="w-full h-full object-cover"
              src={selectedLecture?.videoUrl}
              controls
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select lecture to start video watching
            </div>
          )}
        </div>
        <div className="mt-2 ">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedLecture?.lectureTitle}
          </h2>
        </div>
      </div>

      {/* right or bottom */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-100 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>

        <div className="flex flex-col gap-2 mb-5">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => (
              <button
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg border transition text-left ${
                  selectedLecture?._id === lecture._id
                    ? "bg-gray-200 border-gray-500"
                    : "hover:bg-gray-50 border-gray-300"
                }`}
                onClick={() => setSelectedLecture(lecture)}
              >
                <h2 className=" text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h2>
                <FaCirclePlay className="text-lg text-black "/>
              </button>
            ))
          ) : (
            <p className="text-gray-500">No Lecture Available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewLecture;
