import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createCourse,
  editCourse,
  getCourseById,
  getCreateCourses,
  getPublishedCourses,
  removeCourse,
} from "../controllers/courseController.js";
import upload from "../middleware/multer.js";

const courseRoute = express.Router();

// courseRoute.post("/create", isAuth, createCourse);
// courseRoute.get("/get-published", getPublishedCourses);
// courseRoute.get("/get-creator", isAuth, getCreateCourses);
// courseRoute.post(
//   `/edit-course/:userId`,
//   isAuth,
//   upload.single("thumbnail"),
//   editCourse
// );
// courseRoute.get('/getCourse/:courseId',isAuth, getCourseById)
// courseRoute.delete('/remove/:courseId',isAuth, removeCourse)



//! Create course
courseRoute.post("/create", isAuth, createCourse);

//! Get published courses
courseRoute.get("/get-published", getPublishedCourses);

//! Get courses created by logged-in user
courseRoute.get("/my-courses", isAuth, getCreateCourses);

//! Edit course (PUT recommended)
courseRoute.put(
  "/edit-course/:courseId",
  isAuth,
  upload.single("thumbnail"),
  editCourse
);

// !Get single course
courseRoute.get("/get-course/:courseId", isAuth, getCourseById);

// !Delete course
courseRoute.delete("/remove/:courseId", isAuth, removeCourse);


export default courseRoute;
