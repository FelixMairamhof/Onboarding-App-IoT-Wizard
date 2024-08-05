import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full py-4 bg-gradient-to-t from-gray-800 to-gray-700 shadow-2xl">
      <div className="flex items-center px-4">
        <img className="w-20 h-20 filter invert" src="/iotWizard.png" alt="logo" />
        <h1 className="ml-4 text-center font-bold text-white whitespace-nowrap">
          OnBoarding-IoT-Wizard
        </h1>
      </div>
    </div>
  );
}
