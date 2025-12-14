import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FiEdit, FiPlus } from "react-icons/fi";
import img from "../../assets/empty.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { setCreatorCourseData } from "../../redux/courseSlice";

const Courses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  useEffect(() => {
    const creatorCourses = async () => {
      try {
        const result = await axios.get("/api/course/my-courses");
        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (userData) {
      creatorCourses();
    }
  }, [userData, dispatch]);

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-lg"
          >
            <MdArrowBack size={24} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <button
            onClick={() => navigate("/create-course")}
            className="text-sm font-semibold px-4 py-2 inline-flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black border transition"
          >
            <FiPlus size={20} />
            <span className="hidden sm:inline">Create Course</span>
          </button>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            My Courses
          </h1>
          <p className="text-gray-600 mt-2">Manage and edit your courses</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {creatorCourseData?.length > 0 ? (
            <>
              {/* ================= DESKTOP TABLE ================= */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left">Course</th>
                      <th className="px-6 py-3 text-left">Category</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {creatorCourseData.map((course, index) => (
                      <tr
                        key={course._id}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        {/* Course */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={course.thumbnail || img}
                              alt={course.title}
                              className="w-24 h-16 object-cover rounded-md"
                            />
                            <span className="font-medium text-gray-800">
                              {course.title}
                            </span>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-gray-700">
                          {course.category || "NA"}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 text-gray-700">
                          {course.price !== undefined && course.price !== null
                            ? `₹${course.price}`
                            : "Free"}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              course.isPublished
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {course.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              navigate(`/edit-course/${course._id}`)
                            }
                            className="w-10 h-10 inline-flex items-center justify-center rounded-full hover:bg-blue-100 text-blue-600"
                          >
                            <FiEdit size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ================= MOBILE CARDS ================= */}
              <div className="md:hidden p-4 space-y-4">
                {creatorCourseData.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white border rounded-lg shadow-sm p-4 space-y-3"
                  >
                    {/* Thumbnail + Title */}
                    <div className="flex gap-3">
                      <img
                        src={course.thumbnail || img}
                        alt={course.title}
                        className="w-20 h-14 rounded object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {course.category || "NA"}
                        </p>
                      </div>
                    </div>

                    {/* Price & Status */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">
                        {course.price ? `₹${course.price}` : "Free"}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          course.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {course.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    {/* Action */}
                    <button
                      onClick={() =>
                        navigate(`/edit-course/${course._id}`)
                      }
                      className="w-full flex items-center justify-center gap-2 border rounded-md py-2 text-blue-600 hover:bg-blue-50"
                    >
                      <FiEdit size={18} />
                      Edit Course
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-gray-500">
              <p className="mb-4 text-lg">No courses created</p>
              <button
                onClick={() => navigate("/create-course")}
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                <FiPlus size={20} />
                Create Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
