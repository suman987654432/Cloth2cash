import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    alert('Signup submitted!');
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
      {/* Signup Form */}
      <form 
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col gap-7 border border-white/50"
      >
        <div className="flex flex-col items-center mb-2">
          <div className="text-4xl mb-2 text-blue-500">📝</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Sign Up</h2>
          <p className="text-gray-700 text-base">Create your account to get started.</p>
        </div>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Name"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
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
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="Address"
          className="px-4 py-3 rounded-xl bg-white/80 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-gray-800 placeholder-gray-400 text-lg shadow-sm transition-all"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all text-lg mt-2 hover:scale-105 active:scale-95"
        >
          Sign Up
        </button>
        <div className="text-center mt-3">
          <span className="text-gray-600">Already have an account?</span>{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline bg-transparent border-0 p-0 m-0 align-baseline cursor-pointer">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Signup