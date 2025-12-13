import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const Dashboard = () => {
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  // Course Lectures Data
  const [courseLecturesData] = useState([
    { month: "Jan", lectures: 12 },
    { month: "Feb", lectures: 19 },
    { month: "Mar", lectures: 15 },
    { month: "Apr", lectures: 22 },
    { month: "May", lectures: 28 },
    { month: "Jun", lectures: 35 },
  ]);

  // Student Enrollment Data
  const [studentEnrollmentData] = useState([
    { course: "React Basics", students: 45 },
    { course: "JavaScript Pro", students: 52 },
    { course: "Web Design", students: 38 },
    { course: "Node.js", students: 65 },
    { course: "Python Basics", students: 45 },
  ]);

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
              <p className="text-lg font-semibold text-gray-800">
                {userData?.name || "Educator"}
              </p>

              <p className="text-sm text-gray-700 mt-1">Total Earning : 0</p>

              <p className="text-sm text-gray-700 max-w-xl mx-auto sm:mx-0">
                {userData?.description || "— No description provided —"}
              </p>

              <p
                className="text-sm font-semibold px-4 py-2 mt-3 inline-flex justify-center items-center
      bg-black text-white cursor-pointer hover:bg-white border hover:border-black
      hover:text-black transition"
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
                {userData?.totalCourses ?? 0}
              </p>
            </div>

            {/* Total Students */}
            <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Total Students
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-orange-700">
                {userData?.totalStudents ?? 0}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="text-gray-600 text-sm">Phone</p>
              <p className="text-lg font-semibold text-gray-800">
                {userData?.phone || "—"}
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="text-gray-600 text-sm">Rating</p>
              <p className="text-lg font-semibold text-gray-800">
                ⭐ {userData?.rating ?? "—"}
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <p className="text-gray-600 text-sm">Joined Date</p>
              <p className="text-lg font-semibold text-gray-800">
                {userData?.createdAt
                  ? new Date(userData.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Lectures Graph */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Course Lectures (Monthly)
            </h2>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={courseLecturesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="month"
                    stroke="#666"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#666" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="lectures"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 5 }}
                    activeDot={{ r: 7 }}
                    name="Lectures Created"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Student Enrollment Graph */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Student Enrollment by Course
            </h2>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentEnrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="course"
                    stroke="#666"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#666" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="students"
                    fill="#10b981"
                    name="Students Enrolled"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
