import React, { useState } from "react";
import Home from "./Home";
import axios from "axios";

export default function PasswordProtectedPage() {
  const [password, setPassword] = useState("");
  const [isValidated, setIsValidated] = useState(false);

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(`/api/authenticate`, { password });
      setIsValidated(response.data.isValidPassword);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isValidated) {
    return <Home />;
  }

  return (
    <div>
      <h1>Password Validation</h1>
      <label htmlFor="password">Enter Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordSubmit}>Submit</button>
    </div>
  );
}
