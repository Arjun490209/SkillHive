import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const CardPage = () => {
  const { courseData } = useSelector((state) => state.course);

  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    if (Array.isArray(courseData)) {
      setPopularCourses(courseData.slice(0, 6));
    }
  }, [courseData]);

  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-semibold text-center">
        Our Popular Courses
      </h1>

      <p className="max-w-3xl mx-auto text-sm sm:text-base text-center mt-4 mb-10 text-gray-600">
        Explore top-rated courses designed to boost your skills, enhance
        careers, and unlock opportunities in tech, AI, business and beyond.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
        {popularCourses?.map((course) => (
          <Card
            key={course._id}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          />
        ))}
      </div>
    </section>
  );
};

export default CardPage;
