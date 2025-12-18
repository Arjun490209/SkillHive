import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setLectureData } from "../../redux/lectureSlice";

const EditLecture = () => {
  const navigate = useNavigate();
  const { courseId, lectureId } = useParams();
  const { lectureData } = useSelector((state) => state.lecture);
  const selectedData = lectureData.find((lecture) => lecture._id === lectureId);
  const [lectureTitle, setLectureTitle] = useState(selectedData.lectureTitle);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewFree, setIsPreviewFree] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("lectureTitle", lectureTitle);
  formData.append("videoUrl", videoUrl);
  formData.append("isPreviewFree", isPreviewFree);

  const handleEditLecture = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `/api/course/edit-lecture/${lectureId}`,
        formData
      );
      console.log(result.data);
      dispatch(setLectureData([...lectureData, result.data]));
      toast.success("Lecture Update Successfully.");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Lecture Updated Failed.");
    }
  };

  const handleRemoveLecture = async () => {
    try {
      setIsLoading(true);

      const result = await axios.delete(
        `/api/course/remove-lecture/${lectureId}`
      );
      console.log(result.data);
      toast.success(result.data?.message || "Lecture Removed Successfully");
      navigate(`/create-lecture/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Lecture Remove Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-5">
        {/* header  */}
        <div className="flex items-center gap-2 mb-2">
          <MdArrowBack
            className="text-gray-600 text-xl cursor-pointer hover:text-gray-900"
            onClick={() => navigate(`/create-lecture/${courseId}`)}
          />
          <h2 className="text-xl font-semibold text-gray-800">Edit Lecture</h2>
        </div>

        <button
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm"
          disabled={isLoading}
          onClick={handleRemoveLecture}
        >
          {isLoading ? (
            <CircleLoader color="#ffffff" size={22} />
          ) : (
            "Remove Lecture"
          )}
        </button>

        <div className="space-y-4">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lecture Title*
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:outline-none"
              required
              onChange={(e) => setLectureTitle(e.target.value)}
              value={lectureTitle}
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Video*
            </label>
            <input
              type="file"
              accept="video/*"
              className="w-full h-[46px] border pl-2 border-gray-300 rounded-md text-sm file:h-8 file:rounded-md file:px-3 file:my-[7px] file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 focus:ring-2 focus:ring-black focus:outline-none"
              required
              onChange={(e) => setVideoUrl(e.target.files[0])}
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className=" accent-black h-4 w-4"
              id="isFree"
              onChange={() => setIsPreviewFree((prev) => !prev)}
            />
            <label htmlFor="isFree" className="text-sm text-gray-700">
              Is this Video FREE
            </label>
          </div>
          <p>{loading ? "Course Updating ... Please wait" : <></>}</p>
          <div className="pt-4">
            <button
              className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition-all"
              disabled={loading}
              onClick={handleEditLecture}
            >
              {loading ? (
                <CircleLoader color="#ffffff" size={22} />
              ) : (
                "Update Lecture"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
