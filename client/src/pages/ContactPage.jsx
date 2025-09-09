import React, { useState } from 'react'

const ContactHero = () => (
  <div className="relative h-[70vh]  min-h-[300px] flex items-center justify-center overflow-hidden mb-12">
    {/* Background Image with Blur */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/src/assets/oldclothes.png')`,
        filter: 'blur(3px)',
        transform: 'scale(1.1)'
      }}
    ></div>
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>
    {/* Content */}
    <div className="relative z-10 text-center text-white w-full">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Contact <span className="text-yellow-400">Cloth2Cash</span>
      </h1>
      <p className="text-lg md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
        Have questions, feedback, or want to partner with us? Reach out and our team will get back to you soon!
      </p>
      <a href="#contact-form" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg md:text-xl px-8 md:px-12 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 active:scale-95">
        Get In Touch
      </a>
    </div>
    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </div>
);

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you can add your API call or email logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-0 px-4">
      <ContactHero />
      <div className="max-w-6xl mx-auto">
        <div id="contact-form" className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
          {/* Contact Details - Left Side */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 justify-center">
            <div className="bg-white/90 rounded-xl shadow-md border border-blue-100 p-6 flex flex-col items-center">
              <div className="text-blue-600 text-4xl mb-2">📧</div>
              <div className="font-semibold text-gray-700 text-lg">Email</div>
              <a href="mailto:support@cloth2cash.com" className="text-blue-500 hover:underline break-all">support@cloth2cash.com</a>
            </div>
            <div className="bg-white/90 rounded-xl shadow-md border border-blue-100 p-6 flex flex-col items-center">
              <div className="text-blue-600 text-4xl mb-2">📞</div>
              <div className="font-semibold text-gray-700 text-lg">Phone</div>
              <a href="tel:+919999999999" className="text-blue-500 hover:underline">+91 99999 99999</a>
            </div>
            <div className="bg-white/90 rounded-xl shadow-md border border-blue-100 p-6 flex flex-col items-center">
              <div className="text-blue-600 text-4xl mb-2">📍</div>
              <div className="font-semibold text-gray-700 text-lg">Address</div>
              <div className="text-gray-500">Cloth2Cash HQ, New Delhi, India</div>
            </div>
          </div>
          {/* Contact Form - Right Side */}
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 max-w-2xl space-y-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/60 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-yellow-200/30 rounded-full blur-2xl translate-y-12 -translate-x-12"></div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Send us a Message</h3>
              <p className="text-gray-600">We'd love to hear from you!</p>
            </div>

            <div className="relative group">
              <div className="flex items-center bg-white/80 rounded-xl shadow-md border-2 border-transparent group-focus-within:border-blue-400 group-focus-within:shadow-lg transition-all duration-300">
                <span className="pl-4 text-blue-500 text-xl">👤</span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl bg-transparent border-0 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 text-lg"
                  placeholder="Your Full Name"
                />
              </div>
            </div>
            
            <div className="relative group">
              <div className="flex items-center bg-white/80 rounded-xl shadow-md border-2 border-transparent group-focus-within:border-blue-400 group-focus-within:shadow-lg transition-all duration-300">
                <span className="pl-4 text-blue-500 text-xl">✉️</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 rounded-xl bg-transparent border-0 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 text-lg"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="relative group">
              <div className="flex bg-white/80 rounded-xl shadow-md border-2 border-transparent group-focus-within:border-blue-400 group-focus-within:shadow-lg transition-all duration-300">
                <span className="pl-4 pt-4 text-blue-500 text-xl">💬</span>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-4 rounded-xl bg-transparent border-0 focus:ring-0 outline-none text-gray-800 placeholder-gray-400 text-lg resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={submitted}
              className={`w-full relative overflow-hidden font-bold py-4 px-8 rounded-xl shadow-2xl transition-all duration-300 text-lg tracking-wide ${
                submitted 
                  ? 'bg-green-500 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white hover:scale-105 hover:shadow-blue-500/30 active:scale-95'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center">
                {submitted ? (
                  <>
                    <span className="mr-2">✅</span>
                    Thank You! We'll be in touch soon.
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </span>
              {!submitted && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;