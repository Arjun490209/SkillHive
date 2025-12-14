import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import getCurrentUser from './costumHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Educator/Dashboard'
import Courses from './pages/Educator/Courses'
import EditCourse from './pages/Educator/EditCourse'
import CreateCourse from './pages/Educator/CreateCourse'
import getCreatorCourses from './costumHooks/getCreatorCourse'

const App = () => {
  getCurrentUser()
  getCreatorCourses()

  const {userData} = useSelector((state) => state.user)
  return (
    <>
    <ToastContainer/>
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={!userData ? <SignUp/>: <Navigate to={'/'} />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={userData ?<Profile/> : <Navigate to={'/signup'} />}/>
      <Route path='/forget-password' element={userData ?<ForgetPassword/> : <Navigate to={'/signup'} />}/>
      <Route path='/edit-profile' element={userData ?<EditProfile/> : <Navigate to={'/signup'} />}/>

      {/* Course Route */}
      <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard/>:  <Navigate to={'/signup'} /> }/>
      <Route path='/courses' element={userData?.role === "educator" ? <Courses/>:  <Navigate to={'/signup'} /> }/>
      <Route path='/create-course' element={userData?.role === "educator" ? <CreateCourse/>:  <Navigate to={'/signup'} /> }/>
      <Route path='/edit-course/:courseId' element={userData?.role === "educator" ? <EditCourse/>:  <Navigate to={'/signup'} /> }/>
      


    
    </Routes>
    </>
  )
}

export default App