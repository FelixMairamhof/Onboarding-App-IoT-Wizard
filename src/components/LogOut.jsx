import React from "react";

export default function LogOut({ updateToken }) {
    const handleLogout = async () => {
        updateToken(null);
    };
    return (
        <button 
            className="bg-gray-800 hover:bg-gray-700 my-10 text-white py-2 px-4 rounded"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
