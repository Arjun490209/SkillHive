import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

const ReviewPage = () => {
  const { reviewData } = useSelector((state) => state.review);
  const [latestReview, setLatestReview] = useState([]);

  useEffect(() => {
    setLatestReview(reviewData?.slice(0, 6) || []);
  }, [reviewData]);

  return (
    <section className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-12">
      
      {/* Heading */}
      <h1 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[45px] font-semibold text-center mt-10">
        Real Reviews for Real Courses
      </h1>

      {/* Subtitle */}
      <p className="max-w-3xl text-center text-sm sm:text-[15px] text-gray-600 mt-5 mb-10">
        Discover how our SkillHive Courses is transforming Learning experiences through real feedback form students professionals worldwide.
      </p>

      {/* Reviews Grid */}
      <div className="w-full grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center pb-16">
        {latestReview.map((review, index) => (
          <ReviewCard
            key={index}
            photoUrl={review?.user?.photoUrl}
            ratting={review?.ratting}
            courseTitle={review?.course?.title}
            description={review?.user?.description}
            comment={review?.comment}
            name={review.user.name}
          />
        ))}
      </div>
    </section>
  );
};

export default ReviewPage;
