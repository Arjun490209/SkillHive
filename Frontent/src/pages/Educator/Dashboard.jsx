import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  const CourseProgressData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      lectures: course.lectures?.length || 0,
    })) || [];

  const EnrollData =
    creatorCourseData?.map((course) => ({
      name: course.title?.slice(0, 10) + "...",
      enrolled: course.enrolledStudents?.length || 0,
    })) || [];

  const totalEarning =
    creatorCourseData?.reduce((sum, course) => {
      const studentCount = course.enrolledStudents?.length || 0;
      const courseRevenue = course.price ? course.price * studentCount : 0;
      return sum + courseRevenue;
    }, 0) || 0;

 const totalEnrolledStudents = creatorCourseData?.reduce(
  (sum, course) => sum + (course.enrolledStudents?.length || 0),
  0
) ?? 0;



  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-semibold mb-6 text-lg"
          title="Go to home"
        >
          <MdArrowBack size={24} />
          <span className="hidden sm:inline">Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Educator Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {userData?.name || "Educator"}👋
          </p>
        </div>

        {/* Educator Information Box */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-8">
          {/* Avatar + Description */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 shrink-0">
              {userData?.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl font-semibold">
                  {userData?.name?.charAt(0) || ""}
                </div>
              )}
            </div>

            <div className="text-center sm:text-left w-full">
              <p className="text-lg font-bold text-gray-800">
                {userData?.name || "Educator"}
              </p>

              <p className="text-sm font-bold text-gray-700 mt-1">
                Total Earning : ₹{totalEarning.toLocaleString()}
              </p>

              <p className="text-sm text-gray-700 max-w-xl mx-auto sm:mx-0">
                {userData?.description || "— No description provided —"}
              </p>

              <p
                className="text-sm font-semibold px-4 py-2 mt-3 inline-flex justify-center items-center bg-black text-white cursor-pointer hover:bg-white border hover:border-black hover:text-black transition"
                onClick={() => navigate("/courses")}
              >
                Create Course
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Name */}
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Full Name
              </p>
              <p className="text-xl sm:text-2xl font-bold text-blue-700">
                {userData?.name || "—"}
              </p>
            </div>

            {/* Email */}
            <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">Email</p>
              <p className="text-lg sm:text-xl font-semibold text-green-700 truncate">
                {userData?.email || "—"}
              </p>
            </div>

            {/* Total Courses */}
            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Total Courses
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-purple-700">
                {creatorCourseData?.length ?? 0}
              </p>
            </div>

            {/* Total Students */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Total Students
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-orange-700">
                {totalEnrolledStudents}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* for progress graph */}
          <div className=" bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">
              Course Progress (lectures)
            </h2>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart data={CourseProgressData}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={"lectures"} fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* for students enroll data  */}
          <div className=" bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Student Enrollment </h2>
            <ResponsiveContainer width={"100%"} height={300}>
              <BarChart data={EnrollData}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                <Bar dataKey={"enrolled"} fill="black" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
