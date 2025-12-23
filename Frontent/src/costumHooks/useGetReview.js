import axios from "../utils/axios";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice";
import { useEffect } from "react";

const useGetReview = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const result = await axios.get("/api/review/get-review");
        dispatch(setReviewData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    getReviewData();
  }, [dispatch]);
};

export default useGetReview;
