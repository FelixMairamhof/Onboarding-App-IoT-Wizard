import React from 'react';

const RoleSwitch = ({ isAdmin, onToggle }) => {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex items-center justify-center w-40 h-12 bg-gray-700 rounded-full shadow-lg">
        <span className={`absolute left-2 text-sm font-medium ${isAdmin ? 'text-gray-500' : 'text-gray-300'}`}>User</span>
        <label className="relative inline-flex items-center cursor-pointer ">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={onToggle}
            className="sr-only"
          />
          <div className="w-14 h-7 bg-gray-500 rounded-full shadow-inner"></div>
          <div
            className={`absolute w-6 h-6 bg-gray-300 rounded-full shadow transform transition-transform ${
              isAdmin ? 'translate-x-7 ' : 'translate-x-0'
            }`}
          ></div>
        </label>
        <span className={`absolute right-2 text-sm font-medium ${isAdmin ? 'text-gray-300' : 'text-gray-500'}`}>Admin</span>
      </div>
    </div>
  );
};

export default RoleSwitch;
