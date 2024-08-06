import React from 'react';

const RoleSwitch = ({ isUser, onToggle }) => {
  return (
    <div className="flex justify-center shadow-2xl border-2 mt-6 border-gray-400 rounded-full sm:absolute sm:top-2 sm:right-2">

      
        <div className="relative inline-flex items-center justify-center w-64 h-12 bg-gray-700 rounded-full shadow-lg">
          <span className={`absolute left-4 text-sm font-medium ${isUser ? 'text-gray-500' : 'text-gray-300'}`}>Benutzer</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isUser}
              onChange={onToggle}
              className="sr-only"
            />
            <div className="w-14 h-7 bg-gray-500 rounded-full shadow-inner"></div>
            <div
              className={`absolute w-6 h-6 bg-gray-300 rounded-full shadow transform transition-transform ${
                isUser ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </label>
          <span className={`absolute right-4 text-sm font-medium ${isUser ? 'text-gray-300' : 'text-gray-500'}`}>Admin</span>
        </div>
      
    </div>
  );
};

export default RoleSwitch;
