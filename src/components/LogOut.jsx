import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

export default function LogOut({ user }) {
    const handleLogout = async () => {
        try {
            console.log("User logged out: " + user.email);
            await signOut(auth);
        } catch (error) {
            console.log(error.message.replace('Firebase:', ''));
        }
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
