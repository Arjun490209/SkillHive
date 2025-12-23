import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewCard = ({
  comment,
  name,
  photoUrl,
  description,
  courseTitle,
  ratting,
}) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 md:p-6">
      
      {/* ⭐ Rating */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm sm:text hookup">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>
              {i < ratting ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
      </div>

      {/* 📘 Course */}
      <p className="text-gray-700 text-xs sm:text-sm mb-3">
        Review for: <span className="font-semibold">{courseTitle}</span>
      </p>

      {/* 💬 Comment */}
      <p className="text-gray-700 text-xs sm:text-sm mb-5 line-clamp-3">
        Review: <span className="font-semibold">{comment}</span>
      </p>

      {/* 👤 User */}
      <div className="flex items-center gap-3">
        <img
          src={photoUrl}
          alt={name}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-gray-800 text-sm sm:text-[15px]">
            {name}
          </h2>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
