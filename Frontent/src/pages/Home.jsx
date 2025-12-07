import React from 'react'
import {Link} from 'react-router-dom'
import Nav from '../components/Nav'

const Home = () => {
  return (
    <div className='w-full overflow-hidden'>
      <div className='w-full lg:h-[140vh] h-[70vh] relative'>
        <Nav/>
      </div>
    </div>
  )
}

export default Home