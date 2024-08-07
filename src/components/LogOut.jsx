import React from "react";

export default function LogOut({ updateToken }) {
    const handleLogout = async () => {
        updateToken(null);
    };
    return (
        <button 
            className="bg-gray-800 hover:bg-gray-700 my-4 text-white py-2 px-4 rounded hover:scale-105"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
