import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import ai from "../assets/SearchAi.png";
import Card from "../components/Card";
import { FiMenu, FiX, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AllCourses = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [filterCourse, setFilterCourse] = useState([]);

  const navigate = useNavigate();
  const { courseData } = useSelector((state) => state.course);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    let list = courseData || [];
    if (category.length > 0) {
      list = list.filter((course) =>
        category.includes(course.category)
      );
    }
    setFilterCourse(list);
  }, [category, courseData]);

  const categories = [
    "Web Development",
    "UI/UX Design",
    "Data Science",
    "App Development",
    "Ethical Hacking",
    "AI/ML",
    "Data Analytics",
    "AI Tools",
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full h-16 z-50">
        <Nav />
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-50 bg-black text-white p-2 rounded-md shadow"
      >
        <FiMenu size={22} />
      </button>

      <div className="flex pt-16 h-[calc(100vh-64px)]">
        {/* Overlay */}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed lg:relative top-0 left-0 z-50
            w-[260px] h-full
            bg-black text-white p-6
            transform transition-transform duration-300
            ${open ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0`}
        >
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden absolute top-4 right-4"
          >
            <FiX size={24} />
          </button>

          <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition mb-6 w-full justify-center mt-10 lg:mt-0">
            Search with AI
            <img src={ai} alt="AI" className="w-5 h-5 rounded-full" />
          </button>

          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <form className="space-y-3">
            {categories.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm cursor-pointer hover:text-gray-300"
              >
                <input
                  type="checkbox"
                  value={item}
                  checked={category.includes(item)}
                  onChange={toggleCategory}
                  className="accent-blue-500 w-4 h-4"
                />
                {item}
              </label>
            ))}
          </form>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-black transition"
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold">
              All Courses
            </h2>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div
              className="
                max-w-7xl mx-auto
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                gap-6
                place-items-center sm:place-items-stretch
              "
            >
              {filterCourse.length > 0 ? (
                filterCourse.map((course) => (
                  <Card
                    key={course._id}
                    thumbnail={course.thumbnail}
                    title={course.title}
                    category={course.category}
                    price={course.price}
                    id={course._id}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No courses found
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AllCourses;
