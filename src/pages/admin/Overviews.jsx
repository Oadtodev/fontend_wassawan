import { useState, useEffect } from "react";
import axios from "axios";

const Overviews = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [user, setUser] = useState(null);
  const [usage, setUsage] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchBillDetails = async () => {
    try {
      const response = await axios.get(`http://backend-wassawan2567.vercel.app`);
      const billDetails = response.data.find(detail => detail.room === parseInt(selectedRoom)); // Ensure selectedRoom is an integer
      if (billDetails) {
        setUser({
          room: billDetails.room,
          name: billDetails.name,
          rent: billDetails.rent,
        });
        setUsage({
          newElectricMeter: billDetails.electricity,
          newWaterMeter: billDetails.water,
          sumwater: billDetails.sumwater,
          sumelectric: billDetails.sumelectric,
        });
        setTotalAmount(billDetails.totalAmount);
      } else {
        // Reset user and usage if no bill details found
        setUser(null);
        setUsage(null);
        setTotalAmount(0);
      }
    } catch (error) {
      console.error("Error fetching bill details:", error);
    }
  };

  useEffect(() => {
    if (selectedRoom) {
      fetchBillDetails();
    } else {
      // Reset user and usage when no room is selected
      setUser(null);
      setUsage(null);
      setTotalAmount(0);
    }
  }, [selectedRoom]);

  const handleSaveReceipt = async () => {
    try {
      const response = await axios.post('http://backend-wassawan2567.vercel.app', {
        room: user.room,
        name: user.name,
        rent: user.rent,
        usage: {
          water: usage.newWaterMeter,
          electricity: usage.newElectricMeter,
        },
        totalAmount: totalAmount,
      });
      if (response.status === 200) {
        alert('บันทึกใบเสร็จเรียบร้อย');
      }
    } catch (error) {
      console.error("Error saving receipt:", error);
      alert('เกิดข้อผิดพลาดในการบันทึกใบเสร็จ');
    }
  };

  return (
    <div>
      <div className="p-4">
        <div className="max-w-md mx-auto">
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
      </div>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Receipt Header */}
          <div className="bg-slate-900 text-white px-8 py-6">
            <h1 className="text-3xl font-bold">ใบเสร็จค่าเช่า</h1>
            <p className="mt-2">วรรษวรรณพาณิชย์</p>
          </div>

          {/* Receipt Content */}
          <div className="p-8">
            <div className="mb-8 flex justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">รายละเอียดผู้เช่า</h2>
                <p>ชื่อ: {user ? user.name : "-"}</p>
                <p>ห้อง: {user ? user.room : "-"}</p>
                
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">เลขที่ใบเสร็จ</h2>
                <p>INV-2024001</p>
              </div>
            </div>

            {/* Receipt Items */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2">รายการ</th>
                  <th className="text-right py-2">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2">ค่าเช่าห้องพัก</td>
                  <td className="text-right">{user ? user.rent.toFixed(2) : "0.00"}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">จำนวนหน่วยที่ใช้ น้ำ: {usage ? usage.newWaterMeter : "0.00"}</td>
                  <td className="text-right">{usage ? usage.sumwater.toFixed(2):"0.00"}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2">จำนวนหน่วยที่ใช้ ไฟฟ้า: {usage ? usage.newElectricMeter:"0.00"}</td>
                  <td className="text-right">{usage ? usage.sumelectric.toFixed(2) : "0.00"}</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2">รวมทั้งสิ้น</td>
                  <td className="text-right">{totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <button 
                onClick={handleSaveReceipt}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                บันทึกเป็นรูปภาพ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overviews