import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { FiEdit, FiPlus } from 'react-icons/fi'

const Courses = () => {
  const navigate = useNavigate()

  // Sample course data
  const [courses] = useState([
    { id: 1, name: 'React Basics', price: 2999, status: 'published' },
    { id: 2, name: 'JavaScript Pro', price: 3999, status: 'published' },
    { id: 3, name: 'Web Design', price: 2499, status: 'dropped' },
    { id: 4, name: 'Node.js Advanced', price: 4499, status: 'published' },
    { id: 5, name: 'Python for Beginners', price: 2299, status: 'dropped' }
  ])

  const handleBack = () => {
    navigate(-1)
  }

  const handleCreateCourse = () => {
    navigate('/educator/createCourse')
  }

  const handleEditCourse = (courseId) => {
    navigate(`/educator/editCourse/${courseId}`)
  }

  return (
    <div className='w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header with Back Button and Create Course Button */}
        <div className='flex items-center justify-between mb-8'>
          <button
            onClick={handleBack}
            className='flex items-center gap-2 text-gray-700 hover:text-gray-900 transition font-semibold text-lg'
            title='Go back'
          >
            <MdArrowBack size={24} />
            <span className='hidden sm:inline'>Back</span>
          </button>

          <button
            onClick={handleCreateCourse}
            className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200'
          >
            <FiPlus size={20} />
            <span className='hidden sm:inline'>Create Course</span>
            <span className='sm:hidden'>+</span>
          </button>
        </div>

        {/* Page Title */}
        <div className='mb-8'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-800'>
            My Courses
          </h1>
          <p className='text-gray-600 mt-2'>Manage and edit your courses</p>
        </div>

        {/* Courses Table */}
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          {courses.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-100 border-b border-gray-300'>
                  <tr>
                    <th className='px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 text-sm sm:text-base'>
                      Course Name
                    </th>
                    <th className='px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 text-sm sm:text-base'>
                      Price
                    </th>
                    <th className='px-4 sm:px-6 py-3 text-left font-semibold text-gray-700 text-sm sm:text-base'>
                      Status
                    </th>
                    <th className='px-4 sm:px-6 py-3 text-center font-semibold text-gray-700 text-sm sm:text-base'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      {/* Course Name */}
                      <td className='px-4 sm:px-6 py-4 font-medium text-gray-800 text-sm sm:text-base'>
                        {course.name}
                      </td>

                      {/* Price */}
                      <td className='px-4 sm:px-6 py-4 text-gray-700 text-sm sm:text-base'>
                        ₹{course.price.toLocaleString()}
                      </td>

                      {/* Status Badge */}
                      <td className='px-4 sm:px-6 py-4'>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                            course.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {course.status === 'published' ? '✓ Published' : '✗ Dropped'}
                        </span>
                      </td>

                      {/* Action - Edit Icon */}
                      <td className='px-4 sm:px-6 py-4 text-center'>
                        <button
                          onClick={() => handleEditCourse(course.id)}
                          className='inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 text-blue-600 transition'
                          title='Edit course'
                        >
                          <FiEdit size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center py-12 text-gray-500'>
              <p className='text-lg font-medium mb-4'>No courses yet</p>
              <button
                onClick={handleCreateCourse}
                className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200'
              >
                <FiPlus size={20} />
                Create Your First Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Courses