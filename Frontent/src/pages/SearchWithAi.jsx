import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ai from "../assets/ai.png";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import start from "../assets/start.mp3";

const SearchWithAi = () => {
  const startSound = new Audio(start);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false)

  const recognitionRef = useRef(null);

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  // 🎤 Initialize speech recognition ONCE
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };

    recognition.onerror = () => {
      toast.error("Mic permission denied or error occurred");
    };

    recognitionRef.current = recognition;
  }, []);

  const handleSearch = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.start();
    startSound.play();
    setListening(true)
  };

  const handleRecommendation = async (query) => {
    if (!query) return;
    
    try {
      const result = await axios.post("/api/course/search", {
        input: query,
      });
      setRecommendations(result.data);
      setListening(false)
      if (result.data.length > 0) {
        speak("These are to stop courses I found for you.");
      } else {
        speak("No course found");
      }
    } catch (error) {
      toast.error("AI search failed");
      console.log(error);
      setListening(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white flex flex-col items-center px-4 py-1">
      <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center relative">
        <FaArrowLeftLong
          className="absolute text-black w-5 h-5 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-6 flex items-center justify-center gap-2">
          <img src={ai} alt="AI" className="w-7 h-7" />
          Search With <span className="text-[#b92ca2]">AI</span>
        </h1>

        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden shadow-lg relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="What do you want to learn? (AI, MERN, Cloud...)"
          />

          {input && (
            <button
              className="absolute right-14 bg-white rounded-full"
              onClick={() => handleRecommendation(input)}
            >
              <img src={ai} alt="" className="w-10 h-10 p-2" />
            </button>
          )}

          <button
            className="absolute right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleSearch}
          >
            <RiMicAiFill className="w-5 h-5 text-[#aa4992]" />
          </button>
        </div>
      </div>

      {
        recommendations.length > 0 ? (
          <div className="w-full max-w-6xl mt-12 px-2 sm:px-4">
            <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-white text-center">AI Search Result</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {
                recommendations?.map((course, index)=>(
                  <div key={index} className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-indigo-500/30 transition-all duration-200 border border-gray-200 cursor-pointer hover:bg-gray-200" onClick={()=>navigate(`/view-course/${course._id}`)}>
                    <h2 className=" text-lg font-semibold sm:text-xl">{course.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">{course.category}</p>
                  </div>
                ))
              }
            </div>
          </div>
        ):(listening ? <h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">Listening...</h1>:<h1 className="text-center text-xl sm:text-2xl mt-10 text-gray-400">No Courses Found Yet</h1>)
      }
    </div>
  );
};

export default SearchWithAi;
