import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackgroundLogo from './components/BackgroundLogo';
import RoleSwitch from './components/RoleSwitch'; 
import LoginUser from './components/LoginUser.jsx';
import CerpStackPage from './components/CerpStackPage.jsx';
import useToken from './hooks/useToken';  // Import the custom hook
import FileUpload from './components/FileUpload.jsx';
import { jwtDecode } from "jwt-decode";
import LogOut from './components/LogOut.jsx';

function App() {
  const [isUser, setIsUser] = useState(true); // State to manage role view
  const [token, updateToken] = useToken(); // Use the custom hook for token management
  const [isAdmin, setIsAdmin] = useState(false); 

  const handleRoleToggle = () => {
    setIsUser(!isUser);
  };
  function getAdminFromJwtToken(){
    const decodedToken = jwtDecode(token);
    //Check for all DB entries in the admins table
    if(decodedToken.sub === 'felix.mairamhof@comm-unity.at'){
      setIsAdmin(true);
    }
  }
  useEffect(() => {
    getAdminFromJwtToken();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center">
        {token ? (
          <>
            {isUser ? (
              <CerpStackPage updateToken={updateToken} />
            ) : (
              <>
                <FileUpload />
                <LogOut updateToken={updateToken} />
              </>
            )}
            {isAdmin && <RoleSwitch isUser={isUser} onToggle={handleRoleToggle} />}
            
          </>
        ) : (
          <LoginUser type="Benutzer" updateToken={updateToken} />
        )}
      </div>
      <BackgroundLogo />
      <Footer />
    </div>
  );
}

export default App;
