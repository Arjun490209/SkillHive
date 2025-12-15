import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-bold text-white'>LMS Platform</h3>
            <p className='text-gray-300 text-sm leading-relaxed'>
              Empowering learners worldwide with quality education. Learn from industry experts and advance your career with our comprehensive courses.
            </p>
            <div className='flex space-x-4'>
              <Link to='#' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <FaFacebookF size={20} />
              </Link>
              <Link to='#' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <FaTwitter size={20} />
              </Link>
              <Link to='#' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <FaInstagram size={20} />
              </Link>
              <Link to='#' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <FaLinkedinIn size={20} />
              </Link>
              <Link to='#' className='text-gray-400 hover:text-white transition-colors duration-200'>
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='/about' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/courses' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Courses
                </Link>
              </li>
              <li>
                <Link to='/instructors' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Instructors
                </Link>
              </li>
              <li>
                <Link to='/blog' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Blog
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Categories</h4>
            <ul className='space-y-2'>
              <li>
                <Link to='/courses/web-development' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Web Development
                </Link>
              </li>
              <li>
                <Link to='/courses/data-science' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Data Science
                </Link>
              </li>
              <li>
                <Link to='/courses/ui-ux-design' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link to='/courses/mobile-development' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link to='/courses/ai-ml' className='text-gray-300 hover:text-white transition-colors duration-200 text-sm'>
                  AI/ML
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Contact Info</h4>
            <div className='space-y-3'>
              <div className='flex items-start space-x-3'>
                <div className='text-gray-400 mt-1'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                  </svg>
                </div>
                <p className='text-gray-300 text-sm'>
                  123 Learning Street<br />
                  Education City, EC 12345
                </p>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='text-gray-400'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                  </svg>
                </div>
                <p className='text-gray-300 text-sm'>+1 (555) 123-4567</p>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='text-gray-400'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                  </svg>
                </div>
                <p className='text-gray-300 text-sm'>support@lmsplatform.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <p className='text-gray-400 text-sm'>
              © {new Date().getFullYear()} LMS Platform. All rights reserved.
            </p>
            <div className='flex space-x-6'>
              <Link to='/privacy-policy' className='text-gray-400 hover:text-white transition-colors duration-200 text-sm'>
                Privacy Policy
              </Link>
              <Link to='/terms-of-service' className='text-gray-400 hover:text-white transition-colors duration-200 text-sm'>
                Terms of Service
              </Link>
              <Link to='/cookie-policy' className='text-gray-400 hover:text-white transition-colors duration-200 text-sm'>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer