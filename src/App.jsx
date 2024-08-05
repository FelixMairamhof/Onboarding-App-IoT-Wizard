import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
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
import CerpStackPage from './components/CerpStackPage.jsx';
import useToken from './hooks/useToken';  // Import the custom hook

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // State to manage role view
  const [token, updateToken] = useToken(); // Use the custom hook for token management

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

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
      <div className={`fixed ${isDesktop ? 'top-8 right-2 scale-90' : 'top-1 right-2 scale-75'} `}>
        <RoleSwitch isAdmin={isAdmin} onToggle={handleRoleToggle} desktop={isDesktop} />
      </div>
      <div className="flex-grow flex flex-col items-center justify-center">
        {isAdmin ? (
          !user ? (
            <LoginAdmin type="Administrator"/>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center">
              <FileUpload />
              <LogOut user={user} updateToken={updateToken} />
            </div>
          )
        ) : (
          token ? (
            <CerpStackPage updateToken={updateToken} />
          ) : (
            <LoginUser type="Benutzer" updateToken={updateToken} />
          )
        )}
      </div>
      <BackgroundLogo />
      <Footer />
    </div>
  );
}

export default App;
