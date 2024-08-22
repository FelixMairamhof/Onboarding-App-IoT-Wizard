import React, { useState } from 'react';
import axios from 'axios';

export default function LoginUser({ updateToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState('login'); // 'login' or '2fa'
  const [verificationCode, setVerificationCode] = useState('');
  const [providerType, setProviderType] = useState(); // Default provider type
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false); // New state to handle loading

  const API_BASE_URL = 'https://kundenportal.iot-wizard.at';

  const handleAuth = async (event) => {
    event.preventDefault();

    if (loading) return; // Prevent further submissions while loading
    setLoading(true); // Set loading state

    if (step === 'login') {
      if (!email || !password) {
        setFeedback('Bitte füllen Sie beide Felder aus.');
        setLoading(false); // Reset loading state
        return;
      }

      try {
        // Perform the initial login
        const responseUser = await axios.post(`${API_BASE_URL}/api/auth/login`, {
          username: email,
          password: password
        });

        setToken(responseUser.data.token);

        // Perform 2FA providers request
        const response2Fa = await axios.get(`${API_BASE_URL}/api/auth/2fa/providers`, {
          headers: {
            'Authorization': `Bearer ${responseUser.data.token}`,
          }
        });

        console.log(response2Fa);

        if (response2Fa.data.length > 0) {
          setProviderType(response2Fa.data[0].type); // Assume providerType is at index 0
          setStep('2fa'); // Proceed to 2FA step
        } else {
          updateToken(responseUser.data.token); // No 2FA required, update token
          setFeedback('Erfolgreich Angemeldet');
          setStep('login'); // Ensure correct step
        }

      } catch (error) {
        handleLoginError(error);
      } finally {
        setLoading(false); // Reset loading state
      }
    } else if (step === '2fa') {
      if (!verificationCode) {
        setFeedback('Bitte geben Sie den 2FA-Code ein.');
        setLoading(false); // Reset loading state
        return;
      }

      try {
        // Remove any spaces from the verification code
        const cleanedVerificationCode = verificationCode.replace(/\s+/g, '');

        // Verify the 2FA code with the API request
        const response = await axios.post(
          `${API_BASE_URL}/api/auth/2fa/verification/check`,
          null, // No request body required
          {
            params: {
              providerType,
              verificationCode: cleanedVerificationCode // Use the cleaned code
            },
            headers: {
              'Authorization': `Bearer ${token}`, // Ensure the token is correctly included
              'Content-Type': 'application/json'
            }
          }
        );

        setToken(response.data.token);
        updateToken(response.data.token); // Update the token using the custom hook
        setFeedback('Erfolgreich Angemeldet');
        setStep('login'); // Reset to login step for future logins
      } catch (error) {
        console.log(error);
        handle2FAError(error);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const handleLoginError = (error) => {
    const status = error.response?.status;
    if (status === 401) {
      setFeedback('Benutzername oder Passwort ist ungültig.');
    } else {
      setFeedback('Es gab einen Fehler beim Anmelden.');
    }
  };

  const handle2FAError = (error) => {
    const status = error.response?.status;

    if (status === 400) {
      setFeedback('Ungültige Anfrage. Bitte überprüfen Sie Ihre Eingaben.');
    } else if (status === 401) {
      setFeedback('Der 2FA-Code ist ungültig.');
    } else if (status === 403) {
      setFeedback('Sie haben keine Berechtigung für diese Operation.');
    } else if (status === 429) {
      setFeedback('Zu viele Anfragen. Bitte versuchen Sie es später erneut.');
    } else {
      setFeedback('Es gab einen Fehler bei der 2FA-Verifizierung.');
    }
  };

  return (
    <div className="w-full max-w-xs bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        {step === 'login' ? 'Anmelden' : '2FA Bestätigung'}
      </h2>
      <form className="space-y-4" onSubmit={handleAuth}>
        {step === 'login' ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Geben Sie ihre E-Mail ein"
                className="mt-1 block w-full px-3 py-2 border bg-gray-200 border-gray-500 rounded-md shadow-xl placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Geben Sie ihr Passwort ein"
                className="mt-1 block w-full px-3 py-2 bg-gray-200 border border-gray-500 rounded-md shadow-xl placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                required
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-300">2FA-Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Geben Sie den 2FA-Code ein"
              className="mt-1 block w-full px-3 py-2 border bg-gray-200 border-gray-500 rounded-md shadow-xl placeholder-gray-400 focus:outline-none focus:ring-gray-400 focus:border-gray-400"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className={`w-full shadow-xl ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500'} text-white py-2 px-4 rounded-md hover:scale-105 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`}
          disabled={loading} // Disable button while loading
        >
          {step === 'login' ? 'Login' : 'Verifizieren'}
        </button>
        {feedback && (
          <h1 className="text-center text-gray-200 mt-2">{feedback}</h1>
        )}
      </form>
    </div>
  );
}
