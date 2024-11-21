import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Manage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tenants, setTenants] = useState([]);

  const fetchTenants = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setTenants(data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

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

  const handleEdit = async (tenant) => {
    const { value: formValues } = await Swal.fire({
      title: 'แก้ไขข้อมูลผู้เช่า',
      html: `
        <input id="name" class="swal2-input" placeholder="ชื่อ-นามสกุล" value="${tenant.name}">
        <input id="room" class="swal2-input" placeholder="เลขห้อง" type="number" value="${tenant.room}">
        <input id="rent" class="swal2-input" placeholder="ค่าเช่า" type="number" value="${tenant.rent}">
        <input id="tel" class="swal2-input" placeholder="เบอร์โทร" type="text" value="${tenant.tel}">
      `,
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
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
    });

    if (formValues) {
      try {
        const response = await fetch(`https://backend-wassawan2567.vercel.app/${tenant._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues)
        });
        if (response.ok) {
          Swal.fire('สำเร็จ!', 'ข้อมูลผู้เช่าได้รับการอัปเดตเรียบร้อยแล้ว', 'success');
          fetchTenants(); // Refresh data
        } else {
          Swal.fire('ผิดพลาด!', 'ไม่สามารถอัปเดตข้อมูลได้', 'error');
        }
      } catch (error) {
        console.error("Error updating tenant:", error);
      }
    }
  };

  return (
    <>
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Room Overviews</h1>
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
                      : "border-2 border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-pulse"
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
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Check In:</span>
                        <span>{tenant.createdAt}</span>
                      </div>
                    )}
                    {tenant && (
                      <div className="flex justify-end space-x-2 mt-3">
                        <button 
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                          onClick={() => handleEdit(tenant)}
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
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
      className="fixed bottom-5 left-0 bg-blue-500 text-white border-none rounded p-2 cursor-pointer z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 17a1 1 0 01-1-1V5.414l-3.293 3.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 5.414V16a1 1 0 01-1 1z" clipRule="evenodd" />
      </svg>
    </button>
    </>
  );
};

export default Manage;
