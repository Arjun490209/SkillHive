import mongoose, { Types } from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      Type: String,
      require: true,
    },
    subTitle: {
      Type: String,
    },
    description: {
      Type: String,
    },
    category: {
      Type: String,
      require: true,
    },
    level: {
      Type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    price: {
      Type: Number,
    },
    thumbnail: {
      Type: String,
    },
    enrolledStudents: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    lectures: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
    },
    creator: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    reviews: {
      Type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  },
  { timestamps: true }
);


const Course = mongoose.model("Course", courseSchema)

export default Course
