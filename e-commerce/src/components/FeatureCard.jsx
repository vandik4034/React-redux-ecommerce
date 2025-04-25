// FeatureCard.js
import React from "react";

const FeatureCard = ({ icon, title, desc }) => {
  return (

    <div  className="flex  gap-2 bg-gray-400 px-4 py-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out"> 

    {icon}
    <div>

      <h2 className="font-medium text-xl">{title}</h2>
      <p className="text-gray-600">{desc}</p>

    </div>
    </div>
   
  );
};

export default FeatureCard;



