import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createCourse,
  createLecture,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreateCourses,
  getCreatorById,
  getPublishedCourses,
  removeCourse,
  removeLecture,
} from "../controllers/courseController.js";
import upload from "../middleware/multer.js";

const courseRoute = express.Router();

// ! For Courses
courseRoute.post("/create", isAuth, createCourse);
courseRoute.get("/get-published", getPublishedCourses);
courseRoute.get("/my-courses", isAuth, getCreateCourses);
courseRoute.put(
  "/edit-course/:courseId",
  isAuth,
  upload.single("thumbnail"),
  editCourse
);
courseRoute.get("/get-course/:courseId", isAuth, getCourseById);
courseRoute.delete("/remove/:courseId", isAuth, removeCourse);

// ! for Lectures
courseRoute.post("/create-lecture/:courseId", isAuth, createLecture);
courseRoute.get("/course-lecture/:courseId", isAuth, getCourseLecture);
courseRoute.post(
  "/edit-lecture/:lectureId",
  isAuth,
  upload.single("videoUrl"),
  editLecture
);
courseRoute.delete("/remove-lecture/:lectureId", isAuth, removeLecture);

// get creator
courseRoute.post(`/creator`,isAuth, getCreatorById)

export default courseRoute;
