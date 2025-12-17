import React, { useState } from 'react'
import { MdArrowBack } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import {useNavigate, useParams} from 'react-router-dom'

const CreateLecture = () => {
    const navigate = useNavigate()
    const courseId = useParams()
    const [loading, setLoading] = useState(false)
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white shadow-lg rounded-xl w-full max-w-2xl p-6'>
            {/* header  */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Create Course Lecture</h1>
                <p className=' text-sm text-gray-500 '> Enter the Title and add your video lectures to enhance your course content</p>
            </div>

            {/* Input area  */}
            <input type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='e.g. Introduction to Data Science' />

            {/* button  */}
            <div className='flex gap-4 mb-6'>
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm font-medium' onClick={()=>navigate(-1)} > <MdArrowBack size={22} />Back to Course</button>
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all shadow" disabled={loading}>{loading? <ClipLoader size={18}/> :"+ Create Lecture"}</button>
            </div>
        </div>
    </div>
  )
}

export default CreateLecture