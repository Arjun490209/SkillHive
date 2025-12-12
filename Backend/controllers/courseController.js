import Course from "../models/CourseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

// Create Course
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "All fields required." });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: `Course create error ${error.message}` });
  }
};

// Get Published Courses
export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true });

    return res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Published course error ${error.message}` });
  }
};

// Get Courses Created by Logged-in User
export const getCreateCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }

    return res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Get Create find course error ${error.message}` });
  }
};

// Edit Course
export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
    } = req.body;

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const updateDta = {
      title,
      subTitle,
      description,
      category,
      level,
      price,
      isPublished,
      thumbnail,
    };

    // Remove undefined values
    Object.keys(updateDta).forEach(
      (key) => updateDta[key] === undefined && delete updateDta[key]
    );

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateDta, {
      new: true,
    });

    return res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: `Edit course error ${error.message}` });
  }
};

// Get Course by ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: `Course Id error ${error.message}` });
  }
};

// Remove Course
export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({ message: "Course removed successfully" });
  } catch (error) {
    res.status(500).json({ message: `Remove Course error ${error.message}` });
  }
};
