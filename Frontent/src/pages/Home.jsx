import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to={'/signup'} > Signup </Link>
      <Link to={'/login'} > login </Link>
    </div>
  )
}

export default Home