import Course from "../models/CourseModel.js";
import Lecture from "../models/LectureModel.js";
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
    const courses = await Course.find({ isPublished: true }).populate("lectures")

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

// ! Lecture ke

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        message: "Lecture title and courseId are required",
      });
    }

    //! create lecture
    const lecture = await Lecture.create({ lectureTitle });

    //! find course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    //! push lecture into course
    course.lectures.push(lecture._id);
    await course.save();

    //! populate lectures
    await course.populate("lectures");

    res.status(201).json({
      success: true,
      lecture,
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: `Create Lecture error: ${error.message}`,
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: `Get Course Lecture error: ${error.message}`,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    // video upload
    // let videoUrl;
    // if(req.file){ videoUrl =await uploadOnCloudinary(req.file.path)
    //    lecture.videoUrl= videoUrl }
    if (req.file) {
      const videoUpload = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUpload.secure_url || videoUpload;
    }

    // update title
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    // safe boolean update
    if (typeof isPreviewFree === "boolean") {
      lecture.isPreviewFree = isPreviewFree;
    }
    // lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    return res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    res.status(500).json({
      message: `Edit Lecture error: ${error.message}`,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const {lectureId} =req.params
    const lecture = await Lecture.findByIdAndDelete(lectureId)
    if(!lecture){
      return res.status(404).json({
        message: "Lecture not found",
      });
    }

    await Course.updateOne(
     { lectures:lectureId},
     {$pull:{lectures:lectureId}} 
    )
    return res.status(200).json({message:"Lecture removed"})
  } catch (error) {
    res.status(500).json({
      message: `Failed remove Lecture error: ${error.message}`,
    });
  }
};
