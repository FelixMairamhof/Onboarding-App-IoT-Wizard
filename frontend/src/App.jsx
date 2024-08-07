import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BackgroundLogo from './components/BackgroundLogo.jsx';
import RoleSwitch from './components/RoleSwitch.jsx'; 
import LoginUser from './components/LoginUser.jsx';
import CerpStackPage from './components/CerpStackPage.jsx';
import useToken from './hooks/useToken.js';  
import FileUpload from './components/FileUpload.jsx';
import LogOut from './components/LogOut.jsx';
import ThingBoardPage from './components/ThingBoardPage.jsx';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";

function App() {
  const [isUser, setIsUser] = useState(true); 
  const [token, updateToken] = useToken(""); // Default empty string
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isOnCerpStackPage, setIsOnCerpStackPage] = useState(true);

  useEffect(() => {
    if (token) {
      // Fetch admin status from the backend
      const checkAdminStatus = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/admins', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          // Assuming the endpoint returns a list of admins, check if the token user is in the list
          const admins = response.data;
          const decodedToken = jwtDecode(token);
          const userEmail = decodedToken.sub;
          const isAdminUser = admins.some(admin => admin.email === userEmail);
          setIsAdmin(isAdminUser);
        } catch (error) {
          console.error('Error fetching admin status:', error);
        }
      };

      checkAdminStatus();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        {token ? (
          <>
            {isUser ? (
              isOnCerpStackPage ? (
                <>
                  <CerpStackPage setIsOnCerpStackPage={setIsOnCerpStackPage} />
                  <LogOut updateToken={updateToken} />
                </>
              ) : (
                <>
                  <ThingBoardPage setIsOnCerpStackPage={setIsOnCerpStackPage} />
                  <LogOut updateToken={updateToken} />
                </>
              )
            ) : (
              <>
                <FileUpload />
                <LogOut updateToken={updateToken} />
              </>
            )}
            {isAdmin && <RoleSwitch isUser={isUser} onToggle={() => setIsUser(!isUser)} />}
          </>
        ) : (
          <LoginUser updateToken={updateToken} />
        )}
      </div>
      <BackgroundLogo />
      <Footer />
    </div>
  );
}

export default App;
