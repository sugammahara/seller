import React, { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin" && password === "admin123") {
      localStorage.setItem("admin", "admin");
      window.location.href = "/admin/dashboard";
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#1E2433] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4 bg-[#111827] text-white shadow">
        <h1 className="text-2xl font-bold">SellerHub</h1>
        <span className="text-lg font-medium">Admin Panel</span>
      </div>

      {/* Login Form Centered */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#2E374D] p-10 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-white text-2xl mb-4 font-semibold">
            Welcome Back
          </h2>
          <p className="text-[#B7B9B9] mb-6">Login to continue as Admin</p>

          <label htmlFor="email" className="block text-white mb-1">
            Username
          </label>
          <input
            type="text"
            id="email"
            placeholder="admin"
            value={email}
            onChange={handleEmailChange}
            className="w-full mb-4 px-3 py-2 rounded bg-transparent border border-[#5C6B94] text-white placeholder-gray-400"
          />

          <label htmlFor="password" className="block text-white mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="admin123"
            value={password}
            onChange={handlePasswordChange}
            className="w-full mb-6 px-3 py-2 rounded bg-transparent border border-[#5C6B94] text-white placeholder-gray-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
