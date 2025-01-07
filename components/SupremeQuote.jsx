import React from 'react';

const SupremeQuote = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-white relative overflow-hidden text-black">
      {/* Background Circle */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 opacity-50 rounded-full scale-[2] transform -translate-x-1/4 -translate-y-1/4"></div>

      {/* Logo Image */}
      <div className="absolute top-20 left-1/4 md:left-1/3 lg:left-1/4 opacity-20">
        <img
          src="/images/home/stamp.png"
          alt="Logo"
          className="w-[250px] h-[250px]"
        />
      </div>

      {/* Quote Text */}
      <div className="max-w-4xl mx-4 z-10 animate-fade-in-up">
        <p className="text-2xl md:text-3xl lg:text-4xl text-center font-serif text-orange-950">
          Supreme Infrastructure is engaged in providing various kinds of Civil Construction
          services that include Building Construction, Substation, Cable Trenching,
          Horticulture Garden design & Maintenance, Interior Designing, Turnkey Projects,
          Rainwater Harvesting, Sewage waste management system, Government Liaising works.
        </p>
      </div>
    </div>
  );
};

export default SupremeQuote;




