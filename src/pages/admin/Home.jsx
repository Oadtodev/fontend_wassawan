import { useState, useEffect } from 'react'

const Home = () => {
  const [roomCount, setRoomCount] = useState(0)




  

  useEffect(() => {
    const fetchRoomCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/')
        const data = await response.json()
        setRoomCount(data.length)
      } catch (error) {
        console.error('Error fetching room count:', error)
      }
    }

    fetchRoomCount()
  }, [])

  
  return (
   <>
  
   <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        {/* <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-500 ">วรรษวรรณพาณิชย์</h1>

        </div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-slate-800 p-4 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,255,0,0.5)] border-2 border-green-500 animate-pulse">
          <div className="bg-slate-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Power Consumption</h3>
            <p className="text-3xl font-bold text-green-500">98.5%</p>
            <p className="text-gray-400">Optimal Range</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center bg-slate-800 p-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:border-green-500 border-2 border-transparent">
            <h3 className="text-xl font-semibold mb-2">Report for Repairs</h3>
            <p className="text-3xl font-bold text-blue-500">100%</p>
            <p className="text-gray-400">All Systems Normal</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg text-center bg-slate-800 p-4 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] hover:border-green-500 border-2 border-transparent">
            <h3 className="text-xl font-semibold mb-2">Rooms Occupied</h3>
            <p className="text-3xl font-bold text-yellow-500">{roomCount}</p>
            <p className="text-gray-400">Currently</p>
           

          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Environmental Controls</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Temperature</span>
                  <span className="text-green-500">21°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Humidity</span>
                  <span className="text-green-500">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Pressure</span>
                  <span className="text-green-500">101.3 kPa</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Maintenance Schedule</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Air Filtration Check</span>
                  <span className="text-yellow-500">Due in 2 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Water Recycling System</span>
                  <span className="text-green-500">Completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Solar Panel Inspection</span>
                  <span className="text-red-500">Overdue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Resource Management</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Oxygen Reserves</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Water Storage</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Food Supplies</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Recent Alerts</h2>
              <div className="space-y-4">
                <div className="flex items-center text-yellow-500">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Minor pressure fluctuation detected</span>
                </div>
                <div className="flex items-center text-green-500">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Weekly system check completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Home