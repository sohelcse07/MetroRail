import React, { useState } from "react";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

const AuthScreen = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);

  // Toggle between login and signup pages
  const switchToLogin = () => setIsLoginPage(true);
  const switchToSignup = () => setIsLoginPage(false);

  return (
    <>
      {isLoginPage ? (
        <LoginPage switchToSignup={switchToSignup} />
      ) : (
        <SignupPage switchToLogin={switchToLogin} />
      )}
    </>
  );
};

export default AuthScreen;