import React, { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import img from "../../assets/empty.jpg";
import { FiEdit } from "react-icons/fi";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EditCourse = () => {
  const thumb = useRef();
  const { courseId } = useParams();
  const [isPublished, setIsPublished] = useState(true);
  const navigate = useNavigate();
  const [selectCourseData, setSelectCourseData] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(`/api/course/get-course/${courseId}`);
      setSelectCourseData(result.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (selectCourseData) {
      setTitle(selectCourseData.title || "");
      setSubTitle(selectCourseData.subTitle || "");
      setDescription(selectCourseData.description || "");
      setCategory(selectCourseData.category || "");
      setLevel(selectCourseData.level || "");
      setPrice(selectCourseData.price || "");
      setFrontendImage(selectCourseData.thumbnail || img);
      setIsPublished(!!selectCourseData.isPublished);
    }
  }, [selectCourseData]);

  useEffect(() => {
    if (courseId) {
      getCourseById();
    }
  }, [courseId]);

  const handleEditCourse = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subTitle", subTitle);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("level", level);
      formData.append("price", price);
      formData.append("isPublished", isPublished ? "true" : "false");

      if (backendImage) {
        formData.append("thumbnail", backendImage);
      }

      const result = await axios.put(
        `/api/course/edit-course/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result.data);
      toast.success("Course Updated Successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Course Update Error");
    } finally {
      setIsLoading(false);
    }
  };

  const removeCourse = async () => {
    try {
      setIsLoading1(true);

      const result = await axios.delete(`/api/course/remove/${courseId}`);
      console.log(result.data);

      toast.success("Course deleted successfully");
      navigate(-1);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to delete course");
    } finally {
      setIsLoading1(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* top bar */}
      <div className="flex items-center justify-center gap-5 md:justify-between flex-col md:flex-row mb-6 relative">
        <MdArrowBack
          className="-top-1/5 md:top-1/5 absolute left-0 md:left-[2%] w-[22px] h-[22px] cursor-pointer "
          onClick={() => {
            navigate(-1);
          }}
        />

        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add Details Information Regarding the Course
        </h2>
        <div className=" space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md ">
            Go To Lectures Page
          </button>
        </div>
      </div>

      {/* form details */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 space-y-2">
          {isPublished ? (
            <button
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border"
              onClick={() => setIsPublished(false)}
            >
              Published (Click to Unpublish)
            </button>
          ) : (
            <button
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border"
              onClick={() => setIsPublished(true)}
            >
              Unpublished (Click to Publish)
            </button>
          )}

          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md border"
            disabled={isLoading1}
            onClick={removeCourse}
          >
            {isLoading1 ? (
              <ClipLoader size={22} color="white" />
            ) : (
              "Remove Course"
            )}
          </button>
        </div>

        {/* Form Start  */}

        <form
          action=""
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              name=""
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="w-full px-4 py-2 rounded-md border"
              placeholder="Course Title"
            />
          </div>

          <div>
            <label
              htmlFor="subTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sub Title
            </label>
            <input
              type="text"
              name=""
              id="subTitle"
              onChange={(e) => {
                setSubTitle(e.target.value);
              }}
              value={subTitle}
              className="w-full px-4 py-2 rounded-md border"
              placeholder="Course Sub Title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              type="text"
              name=""
              id="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="w-full px-4 py-2 rounded-md border h-24 resize-none"
              placeholder="Course Description"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {/*for category */}
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {" "}
                Course Category
              </label>
              <select
                name=""
                id="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                className="w-full px-4 py-2 rounded-md border"
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Data Science">Data Science</option>
                <option value="App Development">App Development</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/*for Level */}
            <div className="flex-1">
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {" "}
                Course Level
              </label>
              <select
                name=""
                id="level"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                value={level}
                className="w-full px-4 py-2 rounded-md border"
              >
                <option value="" disabled>
                  Select a Level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/*for Price */}
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {" "}
                Course Price (INR)
              </label>
              <input
                type="number"
                name=""
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                value={price}
                id="price"
                className="w-full px-4 py-2 rounded-md border"
                placeholder="Course Price"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Thumbnail
            </label>

            <input
              type="file"
              hidden
              ref={thumb}
              accept="image/*"
              onChange={handleThumbnail}
            />
          </div>

          <div className="relative w-[300px] h-[170px]">
            <img
              src={frontendImage}
              alt="thumbnail"
              className="w-full h-full border bg-black rounded-[5px] cursor-pointer"
              onClick={() => thumb.current.click()}
            />
            <FiEdit
              className="w-5 h-5 absolute top-2 right-2 hover:text-green-500"
              onClick={() => thumb.current.click()}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300 active:scale-95"
            >
              Cancel
            </button>

            <button
              type="button"
              className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-black to-gray-800 text-white font-medium shadow-md transition-all duration-200 hover:from-gray-800 hover:to-black hover:shadow-lg active:scale-95"
              onClick={handleEditCourse}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
