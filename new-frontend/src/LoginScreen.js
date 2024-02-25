import React, { useState } from "react";

function LoginScreen() {
  const [isForUser, setIsForUser] = useState(true);

  const handleLogin = (event) => {
    event.preventDefault();

    // Add your login logic here
    console.log("Login successful!");
  };

  return (
    <div className="login-screen">
      <div className="login-header">
        <h2>Are you logging in for:</h2>
      </div>
      <div className="login-options">
        <label>
          <input
            type="radio"
            name="login-option"
            checked={isForUser}
            onChange={() => setIsForUser(true)}
          />
          Yourself
        </label>
        <label>
          <input
            type="radio"
            name="login-option"
            checked={!isForUser}
            onChange={() => setIsForUser(false)}
          />
          Someone Else
        </label>
      </div>
      <form onSubmit={handleLogin}>
        <div className="login-form">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginScreen;
