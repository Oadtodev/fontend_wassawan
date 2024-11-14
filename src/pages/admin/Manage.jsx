import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const Manage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tenants, setTenants] = useState([]);

  const fetchTenants = async () => {
    try {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      setTenants(data);

    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTenants(tenants.filter((tenant) => tenant._id !== id));
      }
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  return (
    <div>
      <div className="flex min-h-screen bg-slate-900 text-white relative">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-20 p-2 bg-slate-800 rounded-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isSidebarOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Left Sidebar */}
        <div
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static z-10 w-64 bg-slate-800 p-4 h-screen transition-transform duration-300 ease-in-out`}
        >
          <h2 className="text-xl font-bold mb-4">Room Management</h2>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Billing (วางบิล)
            </a>
            <a href="#" className="block px-4 py-2 rounded hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Report
            </a>

          </nav>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <div className="bg-slate-700 p-3 rounded">
                <p className="text-sm">Occupied Rooms</p>
                <p className="text-xl font-bold text-green-500">18/24</p>
              </div>
              <div className="bg-slate-700 p-3 rounded">
                <p className="text-sm">Available Rooms</p>
                <p className="text-xl font-bold text-blue-500">6</p>
              </div>
              <div className="bg-slate-700 p-3 rounded">
                <p className="text-sm">Maintenance Required</p>
                <p className="text-xl font-bold text-yellow-500">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Room Overviews</h1>
          <div className="flex justify-between items-center mb-4">

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Room Cards */}
            {[...Array(24)].map((_, index) => {
              const tenant = tenants.find((t) => t.room === index + 1);
              return (
                <div 
                  key={index} 
                  className={`bg-slate-800 p-4 rounded-lg transition-all duration-300 ${
                    tenant
                      ? "border-2 border-green-500 shadow-[0_0_15px_rgba(0,255,0,0.5)]"
                      : "border-2 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold">Room {index + 1}</h3>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        tenant
                          ? "bg-green-500/20 text-green-500"
                          : "bg-red-500/20 text-red-500"
                      }`}
                    >
                      {tenant ? "Occupied" : "Available"}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-400 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">ชื่อ:</span>
                      <span>{tenant ? tenant.name : "-"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-400 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">Rent:</span>
                      <span>฿{tenant ? tenant.rent : 3000}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cyan-400 drop-shadow-[0_0_2px_rgba(34,211,238,0.8)]">tel:</span>
                      <span>{tenant ? tenant.tel : 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span
                        className={tenant ? "text-green-500" : "text-gray-400"}
                      >
                        {tenant ? "Success" : "-"}
                      </span>
                    </div>
                    {tenant && (
                      <div className="flex justify-end space-x-2 mt-3">
                            <button 
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                      
                    >
                      แก้ไข
                    </button>
                        
                        <button 
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                      onClick={() => {
                        Swal.fire({
                          title: 'ยืนยันการลบข้อมูล?',
                          text: "คุณต้องการลบข้อมูลผู้เช่าใช่หรือไม่",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6', 
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'ใช่, ลบข้อมูล',
                          cancelButtonText: 'ยกเลิก'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            handleDelete(tenant._id);
                            Swal.fire(
                              'ลบข้อมูลสำเร็จ!',
                              'ข้อมูลผู้เช่าถูกลบเรียบอยแล้ว',
                              'success'
                            )
                          }
                        })
                      }}
                    >
                      ลบ
                    </button>
              
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add New User Modal */}
      <div className="fixed bottom-4 right-4">
        <button 
          className="btn-newusers"
          onClick={() => {
            Swal.fire({
              title: 'เพิ่มข้อมูลผู้เช่าใหม่',
              html: `
                <input id="name" class="swal2-input" placeholder="ชื่อ-นามสกุล">
                <input id="room" class="swal2-input" placeholder="เลขห้อง" type="number">
                <input id="rent" class="swal2-input" placeholder="ค่าเช่า" type="number">
                <input id="tel" class="swal2-input" placeholder="เบอร์โทร" type="text">
              `,
              showCancelButton: true,
              confirmButtonText: 'เพิ่มข้อมูล',
              cancelButtonText: 'ยกเลิก',
              preConfirm: () => {
                const name = document.getElementById('name').value;
                const room = document.getElementById('room').value;
                const rent = document.getElementById('rent').value;
                const tel = document.getElementById('tel').value;
                if (!name || !room || !rent || !tel) {
                  Swal.showValidationMessage('กรุณากรอกข้อมูลให้ครบถ้วน');
                  return false;
                }
                
                return { name, room, rent, tel };
              }
            }).then((result) => {
              if (result.isConfirmed) {
                // Check if room number already exists
                fetch('http://localhost:5000/')
                  .then(response => response.json())
                  .then(users => {
                    const roomExists = users.some(user => user.room === parseInt(result.value.room));
                    
                    if (roomExists) {
                      Swal.fire(
                        'ผิดพลาด!',
                        'หมายเลขห้องนี้มีผู้เช่าแล้ว',
                        'error'
                      );
                      return;
                    }

                    // If room doesn't exist, proceed with adding new user
                    fetch('http://localhost:5000/api/users', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(result.value)
                    })
                    .then(response => response.json())
                    .then(() => {
                      Swal.fire(
                        'สำเร็จ!',
                        'เพิ่มข้อมูลผู้เช่าเรียบร้อยแล้ว',
                        'success'
                      );
                      // Refresh data
                      fetchTenants();
                    })
                    .catch(() => {
                      Swal.fire(
                        'ผิดพลาด!',
                        'ไม่สามารถเพิ่มข้อมูลได้',
                        'error'
                      );
                    });
                  });
              }
            });
          }}
        >
          <span>Add User</span>
        </button>
      </div>
    </div>
  );
};

export default Manage;
