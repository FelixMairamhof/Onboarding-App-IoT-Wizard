import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundLogo from './components/BackgroundLogo';
import RoleSwitch from './components/RoleSwitch'; 
import LoginUser from './components/LoginUser.jsx';
import CerpStackPage from './components/CerpStackPage.jsx';
import useToken from './hooks/useToken';  
import FileUpload from './components/FileUpload.jsx';
import { jwtDecode } from "jwt-decode";
import LogOut from './components/LogOut.jsx';
import ThingBoardPage from './components/ThingBoardPage.jsx';

function App() {
  const [isUser, setIsUser] = useState(true); 
  const [token, updateToken] = useToken(" ");
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isOnCerpStackPage, setIsOnCerpStackPage] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.sub === 'felix.mairamhof@comm-unity.at') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
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
