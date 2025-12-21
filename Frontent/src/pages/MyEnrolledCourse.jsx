import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const MyEnrolledCourse = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full p-4 py-9 bg-gray-50">
      <FaArrowLeftLong
        className=" absolute top-[3%] md:top-[6%] left-[6%] w-5 h-5 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className=" text-3xl text-center font-bold text-gray-800 mb-6">
        My Enrolled Courses
      </h1>

      {userData?.enrolledCourse?.length === 0 ? (
        <p className="text-gray-500 text-center w-full">
          You haven't enrolled in any course yet.
        </p>
      ) : (
        <div className=" flex items-center justify-center flex-wrap gap-7">
          {
            userData?.enrolledCourse?.map((course, index)=>(
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden border">
                <img src={course.thumbnail} alt="" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                  <p className=" text-sm text-gray-600 mb-1">{course.category}</p>
                  <p className=" text-sm text-gray-600 mb-2">{course.level}</p>
                  <h1 className="px-2.5 text-center py-2.5 border-2 border-black text-white bg-black rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer mt-2.5 hover:bg-gray-700" onClick={()=>navigate(`/view-lecture/${course._id}`)}>Watch Now</h1>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourse;
