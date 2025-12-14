import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { setCreatorCourseData } from "../redux/courseSlice";

const useGetCreatorCourses = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

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
};

export default useGetCreatorCourses;
