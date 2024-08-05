import React from 'react';

const RoleSwitch = ({ isAdmin, onToggle, desktop }) => {
  return (
    <div className="flex justify-center shadow-2xl border-2 border-gray-400 rounded-full">
      {desktop ? (
        <div className="relative inline-flex items-center justify-center w-64 h-12 bg-gray-700 rounded-full shadow-lg">
          <span className={`absolute left-4 text-sm font-medium ${isAdmin ? 'text-gray-500' : 'text-gray-300'}`}>Benutzer</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={onToggle}
              className="sr-only"
            />
            <div className="w-14 h-7 bg-gray-500 rounded-full shadow-inner"></div>
            <div
              className={`absolute w-6 h-6 bg-gray-300 rounded-full shadow transform transition-transform ${
                isAdmin ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </label>
          <span className={`absolute right-4 text-sm font-medium ${isAdmin ? 'text-gray-300' : 'text-gray-500'}`}>Admin</span>
        </div>
      ) : (
        <div className="relative inline-flex items-center justify-center w-12 h-28 bg-gray-700 rounded-full shadow-lg">
          <span className={`absolute top-2 scale-75 text-xs font-medium ${isAdmin ? 'text-gray-500' : 'text-gray-300'}`}>Benutzer</span>
          <label className="relative inline-flex items-center cursor-pointer flex-col">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={onToggle}
              className="sr-only"
            />
            <div className="w-6 h-10 bg-gray-500 rounded-full shadow-inner"></div>
            <div
              className={`absolute w-5 h-5 bg-gray-300 rounded-full shadow transform transition-transform ${
                isAdmin ? 'translate-y-6' : 'translate-y-0'
              }`}
            ></div>
          </label>
          <span className={`absolute bottom-2 text-xs scale-75 font-medium ${isAdmin ? 'text-gray-300' : 'text-gray-500'}`}>Admin</span>
        </div>
      )}
    </div>
  );
};

export default RoleSwitch;
