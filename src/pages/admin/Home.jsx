import { useState } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://www.krungsri.com/getmedia/35830f4a-766b-4e9e-ac5b-20187cf33a1a/io-Industrial_Estate-540.jpg.aspx",
    "https://serodsncustoms.com/wp-content/uploads/2023/08/aerial-drone-view-petrol-industrial-zone-oil-refinery-yaroslavl-russia-during-sunset-time-1370x550.jpg",
    "https://www.lifeandliving.co.th/wp-content/uploads/2022/05/2.%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B4%E0%B8%84%E0%B8%A1%E0%B9%81%E0%B8%AB%E0%B8%A5%E0%B8%A1%E0%B8%89%E0%B8%9A%E0%B8%B1%E0%B8%87-%E0%B9%82%E0%B8%8B%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B8%AD%E0%B8%B2%E0%B8%A8%E0%B8%B1%E0%B8%A2%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%AE%E0%B8%B4%E0%B8%95.jpg",
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="font-sans bg-white">
      {/* Carousel Section */}
      <section className="relative">
        <div className="container mx-auto py-2">
          <div className="relative">
            <img
              src={images[currentIndex]}
              alt={`Carousel image ${currentIndex + 1}`}
              className="w-full h-96 object-cover rounded-lg"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              &#8592;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="properties" className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">Featured Rentals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvb218ZW58MHx8MHx8fDA%3D" alt="Apartment 1" className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">Sunny Beach Apartment</h3>
              <p className="text-gray-500">Miami, FL</p>
              <p className="text-lg font-bold mt-2 text-gray-800">$1,500/month</p>
              <a href="#details" className="text-gray-600 mt-4 inline-block hover:text-gray-800">View Details</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <img src="https://image-thaihometown.com/content/tp3596_files/ploais06.jpg" alt="Apartment 2" className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">Downtown Loft</h3>
              <p className="text-gray-500">New York, NY</p>
              <p className="text-lg font-bold mt-2 text-gray-800">$2,000/month</p>
              <a href="#details" className="text-gray-600 mt-4 inline-block hover:text-gray-800">View Details</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <img src="https://bcdn.propertyhub.in.th/pictures/202107/20210730/X9Mwftoek7Bp7RTmpUVn.jpg?width=486&height=360" alt="Apartment 3" className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">City Center Studio</h3>
              <p className="text-gray-500">Chicago, IL</p>
              <p className="text-lg font-bold mt-2 text-gray-800">$1,200/month</p>
              <a href="#details" className="text-gray-600 mt-4 inline-block hover:text-gray-800">View Details</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 RentHub. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="mr-4 hover:text-gray-800 transition">Facebook</a>
            <a href="#" className="mr-4 hover:text-gray-800 transition">Instagram</a>
            <a href="#" className="hover:text-gray-800 transition">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
