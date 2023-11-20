import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
    try {
      const response = await fetch(
        "http://shserver.top:8080/test/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uname: username, pass: password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        document.cookie = `ticket=${data.ticket}; path=/; `;
        setShowSuccessPopup(true);
        setErrorMessage("Login success");
        console.log(
          JSON.stringify(
            {
              ticket: "YOUR TICKET",
              Lname: "Intelligence",
              name: "Green",
            },
            null,
            2
          )
        );
        setTimeout(() => {
          window.location.href = "http://localhost:3001/";
        }, 4000);
      } else {
        setErrorMessage("Invalid Username or Password");
        console.log(
          JSON.stringify(
            {
              timestamp: new Date().toISOString(),
              status: 400,
              error: "Bad Request",
              message: "Invalid Username or Password",
              path: "/test/users/login",
            },
            null,
            2
          )
        );
        setShowErrorPopup(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white p-3">
            {errorMessage}
          </div>
        )}

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-3">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
