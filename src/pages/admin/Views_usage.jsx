    import { useState, useEffect } from 'react';
    import axios from 'axios';

    const Views_usage = () => {
      const [selectedRoom, setSelectedRoom] = useState('');
      const [usageData, setUsageData] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 2;

      useEffect(() => {
        if (selectedRoom) {
          fetchUsageData(selectedRoom);
        }
      }, [selectedRoom]);

      const fetchUsageData = async (room) => {
        try {
          const response = await axios.get(`http://localhost:5000/api/utilities_usage/${room}`);
          setUsageData(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort by createdAt descending
        } catch (error) {
          console.error('Error fetching usage data:', error);
        }
      };

  
      const totalPages = Math.ceil(usageData.length / itemsPerPage);
      const currentData = usageData
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

      return (
        <>
          <h1 className="text-3xl font-bold text-center mb-4">ข้อมูลการใช้งาน</h1>
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-2">
              เลือกห้อง
            </label>
            <select
              id="room"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- เลือกห้อง --</option>
              {[...Array(24)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  ห้อง {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentData.map((data, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold">ห้อง {data.room}</h2>
                <p>เลขมิเตอร์น้ำ: {data.newWaterMeter}</p>
                <p>เลขมิเตอร์ไฟ: {data.newElectricMeter}</p>
                <p>วันที่จด: {data.createdAt}</p>
               
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              ย้อนกลับ
            </button>
            <span>หน้า {currentPage} จาก {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              ถัดไป
            </button>
          </div>


        </>
      );
    };

    export default Views_usage