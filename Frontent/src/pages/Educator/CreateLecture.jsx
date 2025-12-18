import React, { useEffect, useState } from 'react'
import { MdArrowBack } from "react-icons/md";
import axios from "../../utils/axios";
import { ClipLoader } from "react-spinners";
import {useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setLectureData} from '../../redux/lectureSlice'
import {toast} from 'react-toastify'
import {FaEdit} from 'react-icons/fa'

const CreateLecture = () => {
    const dispatch =useDispatch()
    const {lectureData} = useSelector(state=> state.lecture)
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [loading, setLoading] = useState(false)
    const [lectureTitle, setLectureTitle] = useState("")

    const handleCreateLecture = async () => {
        try {
            setLoading(true)
            const result = await axios.post(`/api/course/create-lecture/${courseId}`, {lectureTitle} )
            dispatch(setLectureData([...lectureData, result.data.lecture]))
            toast.success("Lecture Added")
            setLectureTitle("")
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        const getCourseLecture = async () => {
            try {
                const result = await axios.get(`/api/course/course-lecture/${courseId}`)
                console.log(result.data)
                dispatch(setLectureData(result.data.course.lectures))
            } catch (error) {
                console.log(error)
            }
        }
        getCourseLecture()
    },[])

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white shadow-lg rounded-xl w-full max-w-2xl p-6'>
            {/* header  */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-1'>Create Course Lecture</h1>
                <p className=' text-sm text-gray-500 '> Enter the Title and add your video lectures to enhance your course content</p>
            </div>

            {/* Input area  */}
            <input type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='e.g. Introduction to Data Science' 
            onChange={(e)=> setLectureTitle(e.target.value)}
            value={lectureTitle}
            />

            {/* button  */}
            <div className='flex gap-4 mb-6'>
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-sm font-medium' onClick={()=>navigate(`/edit-course/${courseId}`)} > <MdArrowBack size={22} />Back to Course</button>
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all shadow" disabled={loading} onClick={handleCreateLecture}>
                    {loading? <ClipLoader size={18} color='white'/> :"+ Create Lecture"}
                </button>
            </div>
            <div className='space-y-2'>
                {
                    lectureData?.map((lecture, index) => (
                        <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>
                            <span>lecture :- {index + 1}: {lecture.lectureTitle}</span>
                            <span><FaEdit className='text-gray-500 hover:text-gray-700 cursor-pointers text-lg' onClick={()=>navigate(`/edit-lecture/${courseId}/${lecture._id}`)}/></span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CreateLecture