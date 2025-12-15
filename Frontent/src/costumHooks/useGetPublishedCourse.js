import { useEffect } from "react";
import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { setCourseData } from "../redux/courseSlice";

const useGetPublishedCourse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const result = await axios.get("/api/course/get-published");

        if (Array.isArray(result.data)) {
          dispatch(setCourseData(result.data)); // ✅ FINAL FIX
        } else {
          console.error("Unexpected API format:", result.data);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    };

    getCourseData();
  }, [dispatch]);
};

export default useGetPublishedCourse;
