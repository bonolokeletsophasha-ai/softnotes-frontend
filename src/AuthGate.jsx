import { useEffect, useState } from "react";

import AuthPage from "./components/AuthPage.jsx";
import App from "./App.jsx";

import { getCurrentUser } from "./services/authService.js";

function AuthGate() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Check whether the user already has an active session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.user);
      } catch (error) {
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Show a loading screen while checking the session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#F2F4F1] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#DCEFE2] border-t-[#344E41] rounded-full animate-spin mx-auto mb-4"></div>

          <h2 className="text-xl font-semibold text-[#344E41]">
            SoftNotes
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  // Show authentication page if nobody is logged in
  if (!user) {
    return (
      <AuthPage onAuthenticated={handleAuthenticated} />
    );
  }

  // Show dashboard if user is authenticated
  return (
    <App
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default AuthGate;