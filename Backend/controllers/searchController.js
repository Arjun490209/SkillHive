import Course from "../models/CourseModel.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one **most relevant keyword** from the following list of course categories and levels:
    - App Development
    - AI/ML
    - AI Tools
    - Data Science
    - Data Analytics
    - Ethical Hacking
    - UI UX Designing
    - Web Development
    - Other
    - Beginner
    - Intermediate
    - Advance

    Only reply with one single keyword form the list above that best matches the query. do not explain any thing. No extra text, 

    Query : ${input}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const keyword =
      response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "Other";

    const courses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });

    if (courses.length > 0) {
      return res.status(200).json(courses);
    }

    const aiCourses = await Course.find({
      isPublished: true,
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { subTitle: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
        { level: { $regex: keyword, $options: "i" } },
      ],
    });

    return res.status(200).json(aiCourses);

  } catch (error) {
    return res.status(500).json({
      message: "Search AI error",
      error: error.message,
    });
  }
};
