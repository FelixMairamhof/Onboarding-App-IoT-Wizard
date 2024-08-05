import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundLogo from './components/BackgroundLogo';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config.js';
import FileUpload from './components/FileUpload';
import LogOut from './components/LogOut';
import LoginAdmin from './components/LoginAdmin.jsx';
import RoleSwitch from './components/RoleSwitch'; 
import LoginUser from './components/LoginUser.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to manage role view

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRoleToggle = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="fixed top-40 w-full flex justify-center">
        <RoleSwitch isAdmin={isAdmin} onToggle={handleRoleToggle} />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        {isAdmin ? (
          !user ? (
            
            <LoginAdmin type="Admin"/>
            
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center">
              <FileUpload />
              <LogOut user={user} />
            </div>
          )
        ) : (
          
          <LoginUser type="User"/>
        
        )}
      </div>
      <BackgroundLogo />
      <Footer />
    </div>
  );
}

export default App;
