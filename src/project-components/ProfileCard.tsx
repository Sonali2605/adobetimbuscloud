import React from "react";

const ProfileCard = ({ name }) => {
  return (
    <div className="max-w-xs mx-auto bg-white overflow-hidden shadow-lg p-4">
      <div className="text-center">
        <img
          className="w-20 h-20 rounded-full mx-auto"
          src="https://via.placeholder.com/150"
          alt="Profile"
        />
        <div className="mt-2">
          <h2 className="text-lg font-semibold">{`Welcome, ${name}`}</h2>
          <p className="text-gray-600">{name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
