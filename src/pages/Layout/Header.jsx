
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
                <Link to="/overviews" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Billing</Link>
                <Link to="/manage" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Manage</Link>
                <Link to="/mantanance" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-blue-500">Mantanance</Link>
                <div className="relative inline-block text-left">
                  <div>
                    <button 
                      type="button" 
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-slate-800 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      เพิ่มข้อมูลไฟน้ำ
                      <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.44l3.71-3.23a.75.75 0 111.06 1.06l-4.25 3.5a.75.75 0 01-1.06 0l-4.25-3.5a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {isOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to="/usage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100" role="menuitem">เพิ่มข้อมูลไฟน้ำ</Link>
                        <Link to="/views_usage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100" role="menuitem">ประวัติไฟน้ำ</Link>
                      </div>
                    </div>
                  )}
                </div>
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
            <a href="/overviews" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">Billing</a>
            <a href="/manage" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">Manage</a>
            <a href="/mantanance" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-700 hover:text-blue-500">Mantanance</a>
          </div>
        </div>
      </nav>
    </>
  )}
  export default Header;