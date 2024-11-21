import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios

const Usage = () => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [newWaterMeter, setNewWaterMeter] = useState('');
  const [newElectricMeter, setNewElectricMeter] = useState('');



  

  const handleSubmit = async () => {
    if (!selectedRoom || !newWaterMeter || !newElectricMeter) {
      Swal.fire({
        icon: 'error',
        title: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        text: 'โปรดตรวจสอบข้อมูลอีกครั้ง'
      });
      return;
    }

    if (isNaN(newWaterMeter) || isNaN(newElectricMeter)) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ถูกต้อง',
        text: 'กรุณากรอกเลขมิเตอร์เป็นตัวเลข'
      });
      return;
    } else {
      Swal.fire({
        icon: 'success',
        title: 'ข้อมูลถูกต้อง',
        text: 'เลขมิเตอร์ถูกกรอกเรียบร้อยแล้ว'
      });
    }

    try {
      // Send data to the database using axios
      await axios.post('http://backend-wassawan2567.vercel.app', {
        room: selectedRoom,
        newWaterMeter: newWaterMeter,
        newElectricMeter: newElectricMeter
      });

      Swal.fire({
        icon: 'success',
        title: 'บันทึกข้อมูลสำเร็จ',
        text: `บันทึกข้อมูลห้อง ${selectedRoom} เรียบร้อยแล้ว`
      });

      // Reset form
      setSelectedRoom('');
      setNewWaterMeter('');
      setNewElectricMeter('');
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด!',
        text: 'ไม่สามารถบันทึกข้อมูลได้'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">บันทึกข้อมูลมิเตอร์</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
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

        <div className="bg-white rounded-lg shadow-md p-6">
     

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">เพิ่มข้อมูลมิเตอร์ใหม่</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="water">
                เลขมิเตอร์น้ำใหม่
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="water"
                type="number"
                value={newWaterMeter}
                onChange={(e) => setNewWaterMeter(e.target.value)}
                placeholder="กรอกเลขมิเตอร์น้ำ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="electric">
                เลขมิเตอร์ไฟใหม่
              </label>
              <input
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                id="electric"
                type="number"
                value={newElectricMeter}
                onChange={(e) => setNewElectricMeter(e.target.value)}
                placeholder="กรอกเลขมิเตอร์ไฟ"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Usage;