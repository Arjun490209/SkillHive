import React from "react";
import { FaStar } from "react-icons/fa6";

const Card = ({ thumbnail, title, category, price, rating = 0 }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer w-[300px]">
      
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title || "Course thumbnail"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title || "Course Title"}
        </h3>

        {/* Category */}
        <p className="text-sm text-blue-600 font-medium mb-3">
          {category || "Category"}
        </p>

        {/* Price and Review */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-green-600">
            ₹{price ?? 0}
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="text-sm text-gray-600 font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
