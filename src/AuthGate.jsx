import { useState } from "react";
import AuthPage from "./components/AuthPage.jsx";
import App from "./App.jsx";

function AuthGate() {
  const [user, setUser] = useState(null);

  const handleAuthenticated = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return <App />;
}

export default AuthGate;