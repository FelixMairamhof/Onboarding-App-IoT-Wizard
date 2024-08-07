import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useToken = () => {
  const [token, setToken] = useState(() => Cookies.get('token'));

  const updateToken = (newToken) => {
    if (newToken) {
      Cookies.set('token', newToken, { expires: 7 }); // Token will expire in 7 days
    } else {
      Cookies.remove('token');
    }
    setToken(newToken);
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return [token, updateToken];
};

export default useToken;
