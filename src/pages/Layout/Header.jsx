
import { useState } from 'react'
import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="bg-slate-900 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
               <Link to="/"> <span className="text-2xl font-bold text-blue-500">          <h1 className="text-4xl font-bold text-blue-500 ">วรรษวรรณพาณิชย์</h1>
               </span></Link>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Home</Link>
                <Link to="/overviews" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Overviews</Link>
                <Link to="/manage" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Manage</Link>
                <Link to="/mantanance" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Mantanance</Link>
                <Link to="/challenge" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Challenge</Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              >
                <svg 
                  className="h-6 w-6" 
                  stroke="currentColor" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-slate-800`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">Home</a>
            <a href="/manage" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">Manage</a>
            <a href="/gallery" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">Gallery</a>
            <a href="/challenge" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">News</a>
          </div>
        </div>
      </nav>
    </>
  )}
  export default Header;