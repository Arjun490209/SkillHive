import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCourse } from "../redux/courseSlice";
import img from "../assets/empty.jpg";
import { FaStar, FaLock, FaCirclePlay } from "react-icons/fa6";
import Card from "../components/Card";

const ViewCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { selectedCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [creatorCourse, setCreatorCourse] = useState(null);

  const fetchCourseData = () => {
    const course = courseData.find((c) => c._id === courseId);
    if (course) {
      dispatch(setSelectedCourse(course));
    }
  };

  useEffect(() => {
    if (creatorData?._id && courseData?.length > 0) {
      const creatorCourse = courseData.filter(
        (course) =>
          course.creator === creatorData._id && course._id !== courseId
      );

      setCreatorCourse(creatorCourse);
    }
  }, [creatorData, courseData, courseId]);

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

  useEffect(() => {
    if (courseData?.length > 0) {
      fetchCourseData();
    }
  }, [courseData, courseId]);

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
          <div className="flex-1 space-y-3 mt-5">
            <h1 className=" text-2xl font-bold">{selectedCourse?.title}</h1>
            <p className=" text-gray-600">{selectedCourse?.subTitle}</p>

            <div className="flex items-start flex-col justify-between">
              <div className="text-amber-300 flex gap-2">
                <span className="flex items-center justify-start gap-1">
                  {" "}
                  <FaStar /> 5
                </span>
                <span className=" text-gray-400"> (1,200 Reviews)</span>
              </div>
              <div>
                <span className="text-lg font-medium text-black">
                  ₹ {selectedCourse?.price}
                </span>{" "}
                <span className=" line-through text-sm text-gray-400">599</span>
              </div>

              <ul className="text-sm text-gray-700 space-y-1 pt-2">
                <li>✅ 10+ Hours of video content</li>
                <li>✅ Life time access to course materials</li>
              </ul>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 mt-3 cursor-pointer">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className=" text-xl font-semibold mb-2">What You'll Learn</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Learn {selectedCourse?.category} from Beginning</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl  font-semibold mb-2">
            Who This Course is For
          </h2>
          <p className=" text-gray-700">
            Beginnings, aspiring developers and professionals looking to
            upgrade.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              Course Curriculum
            </h2>
            <p className=" text-sm text-gray-500 mb-4">
              {selectedCourse?.lectures?.length}{" "}
              {selectedCourse?.lectures?.length <= 1 ? "Lecture" : "Lectures"}
            </p>
            <div className="flex flex-col gap-3">
              {selectedCourse?.lectures?.map((lecture, index) => (
                <button
                  key={index}
                  disabled={
                    lecture.isPreviewFree !== true &&
                    lecture.isPreviewFree !== "true"
                  }
                  onClick={() => {
                    if (
                      lecture.isPreviewFree === true ||
                      lecture.isPreviewFree === "true"
                    ) {
                      setSelectedLecture(lecture);
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left ${
                    lecture.isPreviewFree
                      ? "hover:bg-gray-100 cursor-pointer border-gray-300"
                      : "cursor-not-allowed opacity-60 border-gray-200"
                  } ${
                    selectedLecture?.lectureTitle === lecture?.lectureTitle
                      ? "bg-gray-100 borg"
                      : ""
                  }`}
                >
                  <span className=" text-lg text-gray-700">
                    {lecture?.isPreviewFree ? <FaCirclePlay /> : <FaLock />}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {lecture?.lectureTitle}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border-gray-200 border">
            <div className=" aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center">
              {selectedLecture?.videoUrl ? (
                <video
                  src={selectedLecture?.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-sm">
                  Select a preview lecture to watch
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className=" mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Write a Reviews</h2>
          <div className="mb-4">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="fill-gray-400" />
              ))}
            </div>
            <textarea
              name=""
              className="w-full border border-gray-300 rounded-lg p-2"
              placeholder="Write your Review here..."
              rows={3}
            />
            <button className="bg-black text-white mt-3 px-4 py-2 rounded cursor-pointer hover:bg-gray-800 transition-all">
              Submit Review
            </button>
          </div>
        </div>

        {/* For Creator info  */}
        <div className="flex items-center gap-4 pt-4 border-t">
          <img
            src={creatorData?.photoUrl || img}
            alt={creatorData?.name || "Course Creator"}
            className="w-16 h-16 rounded-full border border-gray-200 object-cover"
          />

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {creatorData?.name || "Unknown Creator"}
            </h2>

            <p className="text-sm text-gray-600">
              {creatorData?.description || "Course Creator"}
            </p>

            <p className="text-sm text-gray-600">
              {creatorData?.email || "No email available"}
            </p>
          </div>
        </div>

        <div>
          <p className=" text-xl font-semibold mb-2">
            Other Published course by the Educator.
          </p>
        </div>

        {/* <div className="w-full transition-all duration-300 py-5 flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-20"> */}
        <div className="w-full transition-all duration-300 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-20">
          {creatorCourse?.map((course, index) => (
            <Card
              key={index}
              thumbnail={course.thumbnail}
              id={course._id}
              price={course.price}
              title={course.title}
              category={course.category}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ViewCourse;
