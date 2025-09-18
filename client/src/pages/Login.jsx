import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert('Login submitted!');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/oldclothes.png')`,
          filter: 'blur(4px)',
          zIndex: 0
        }}
      ></div>
      {/* Overlay for dimming */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      {/* Login Form */}
      <form 
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col gap-7 border border-white/50"
      >
        <div className="flex flex-col items-center mb-2">
          {/* <div className="text-4xl mb-2 text-blue-500">🔒</div> */}
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Login</h2>
          <p className="text-gray-700 text-base">Welcome back! Please login to your account.</p>
        </div>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Email"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all text-lg mt-2 hover:scale-105 active:scale-95"
        >
          Login
        </button>
        <div className="text-center mt-3">
          <span className="text-gray-600">New user?</span>{' '}
          <button type="button" onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline bg-transparent border-0 p-0 m-0 align-baseline cursor-pointer">Sign up</button>
        </div>
      </form>
    </div>
  )
}

export default Login