import React from 'react';

const Authority = () => {
  const images = [
    '/Photos/kit.png',
    '/Photos/IdCard.jpg',
    '/Photos/QR.jpg',
  ];

  return (
    <div className="max-w-7xl mx-auto p-4"> {/* Reduced padding from 6 to 4 */}
      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-600 text-left mb-4"> {/* Reduced margin bottom */}
        Kits
      </h1>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Reduced gap between images */}
        {images.map((src, index) => (
          <div key={index} className="flex justify-center">
            <img 
              src={src} 
              alt={`Authority ${index + 1}`} 
              className="object-contain w-full max-w-md h-72 shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authority;
