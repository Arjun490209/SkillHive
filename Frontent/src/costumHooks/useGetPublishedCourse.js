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
        dispatch(setCourseData(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCourseData();
  }, [dispatch]);
};

export default useGetPublishedCourse;
