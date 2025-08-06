import React, { useState, useEffect } from 'react';
import slide1 from "../../assets/slide1.png";
import Button from '../ui/Button';

const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 5000, showControls = true, showDots = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      id: 1,
      heading: "India's <span class='text-red-600 font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>Textile Waste</span> Crisis",
      content: "Millions of clothes are hoarded or thrown away every year. They pile up in homes or landfills, causing pollution and waste.",
      image: slide1,
      bgColor: "bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50",
      accentColor: "text-red-600"
    },
    {
      id: 2,
      heading: "<span class='text-green-600 font-extrabold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent'>Cloth2Cash</span>: Recycle & Earn",
      content: "We make it easy for you to give away old clothes from your doorstep — and earn money for every kilo!",
      image: slide1,
      bgColor: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
      accentColor: "text-green-600"
    },
    {
      id: 3,
      heading: "<span class='text-blue-600 font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>4 Simple Steps</span> to Earn from Old Clothes",
      content: " Upload •  Schedule Pickup •  Get Paid •  Recycle Responsibly",
      image: slide1,
      bgColor: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
      accentColor: "text-blue-600"
    },
    {
      id: 4,
      heading: "<span class='text-purple-600 font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent'>Declutter, Earn</span> & Save the Planet",
      content: " Get cash •  Clear your space •  Reduce waste •  Support eco-friendly recycling",
      image: slide1,
      bgColor: "bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50",
      accentColor: "text-purple-600"
    }
  ];

  const slidesToShow = slides || defaultSlides;

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slidesToShow.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slidesToShow.length]);


  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <div className="relative w-full max-w-screen-7xl mx-auto bg-white rounded-xl lg:rounded-3xl  overflow-hidden h-[90vh] lg:h-[92vh] min-h-[600px] lg:min-h-[400px] max-h-[900px] border border-gray-100">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slidesToShow.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-full flex-shrink-0 h-full flex flex-col lg:grid lg:grid-cols-2 ${slide.bgColor} relative overflow-hidden`}
            >
              {/* Animated Background Patterns */}
              <div className="absolute inset-0 opacity-5">
                <div className={`absolute top-10 left-10 w-32 h-32 ${slide.accentColor.replace('text-', 'bg-')} rounded-full blur-3xl animate-pulse-slow`}></div>
                <div className={`absolute bottom-20 right-20 w-40 h-40 ${slide.accentColor.replace('text-', 'bg-')} rounded-full blur-3xl animate-pulse-slow`} style={{animationDelay: '2s'}}></div>
                <div className={`absolute top-1/2 left-1/4 w-24 h-24 ${slide.accentColor.replace('text-', 'bg-')} rounded-full blur-2xl animate-bounce-slow`}></div>
              </div>

              {/* Left Content */}
              <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 relative py-8 lg:py-0 order-2 lg:order-1 min-h-full z-10">
                {/* Enhanced Animated Background Elements */}
                <div className={`absolute top-6 left-4 w-10 h-10 lg:top-10 lg:left-10 lg:w-20 lg:h-20 ${slide.accentColor} opacity-20 rounded-full animate-pulse-slow shadow-lg`}></div>
                <div className={`absolute bottom-20 right-4 w-8 h-8 lg:bottom-20 lg:right-10 lg:w-16 lg:h-16 ${slide.accentColor} opacity-20 rounded-full animate-bounce-slow shadow-lg`}></div>

                {/* Content */}
                <div className="relative z-20 text-center lg:text-left">
                  <div className="mb-4 lg:mb-4">
                    <span className={`inline-block px-4 py-2 lg:px-5 lg:py-2.5 ${slide.accentColor} bg-white/90 backdrop-blur-md rounded-full text-sm lg:text-sm font-bold shadow-xl border border-white/20`}>
                      ✨ Step {slide.id} of 4
                    </span>
                  </div>

                  <h2
                    className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black mb-5 lg:mb-6 text-gray-800 leading-[1.1] lg:leading-tight tracking-tight transform transition-all duration-700 drop-shadow-lg ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                      }`}
                    dangerouslySetInnerHTML={{ __html: slide.heading }}
                  />

                  <div className={`w-20 lg:w-24 h-1.5 ${slide.accentColor.replace('text-', 'bg-')} rounded-full mb-5 lg:mb-6 mx-auto lg:mx-0 transform transition-all duration-700 delay-200 shadow-lg ${index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                    }`}></div>

                  <p className={`text-lg sm:text-xl lg:text-xl text-gray-700 mb-7 lg:mb-8 leading-relaxed max-w-xl lg:max-w-lg font-normal lg:font-medium transform transition-all duration-700 delay-300 mx-auto lg:mx-0 drop-shadow-sm ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                    {slide.content}
                  </p>

                  <div className={`flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center lg:justify-start transform transition-all duration-700 delay-500 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}>
                    <Button
                      variant="primary"
                      size="lg"
                      className="group shadow-xl hover:shadow-2xl w-full sm:w-auto text-base lg:text-lg px-8 py-4 lg:px-8 lg:py-4 font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      Get Started
                      <svg className="ml-2 w-5 h-5 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="shadow-lg hover:shadow-xl w-full sm:w-auto text-base lg:text-lg px-8 py-4 lg:px-8 lg:py-4 font-semibold transform hover:scale-105 transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>

              {/* Enhanced Right Image - Hidden on mobile */}
              <div className="hidden lg:flex h-full w-full relative overflow-hidden order-1 lg:order-2 items-center justify-center">
                {/* Enhanced gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 z-10"></div>
                <div className={`absolute inset-0 bg-gradient-to-tl from-${slide.accentColor.split('-')[1]}-100/30 via-transparent to-transparent z-10`}></div>

                {/* Image container with enhanced styling */}
                {/* Image container with enhanced styling */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-8">
                  <div className={`relative group transform transition-all duration-1000 ${index === currentSlide ? 'scale-100 opacity-100 rotate-0' : 'scale-95 opacity-80 rotate-1'
                    }`}>
                    {/* Image glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-${slide.accentColor.split('-')[1]}-400 to-${slide.accentColor.split('-')[1]}-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 scale-110`}></div>

                    {/* Main image */}
                    <img
                      src={slide.image}
                      alt="Slide visual"
                      className="relative z-10 w-[620px] h-[520px] object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105"
                    />

                    {/* Image border effect */}
                    <div className={`absolute inset-0 rounded-3xl border-4 border-${slide.accentColor.split('-')[1]}-200/60 group-hover:border-${slide.accentColor.split('-')[1]}-300/70 transition-all duration-500`}></div>
                  </div>
                </div>


                {/* Enhanced Floating Elements with slower animations */}
                <div className={`absolute top-16 right-16 w-16 h-16 ${slide.accentColor.replace('text-', 'bg-')} rounded-full opacity-10 animate-float-slow shadow-xl hidden lg:block`}></div>
                <div className={`absolute bottom-24 right-24 w-12 h-12 ${slide.accentColor.replace('text-', 'bg-')} rounded-full opacity-15 animate-float-delayed-slow shadow-lg hidden lg:block`}></div>
                <div className={`absolute top-1/3 right-8 w-8 h-8 ${slide.accentColor.replace('text-', 'bg-')} rounded-full opacity-20 animate-pulse-slow shadow-md hidden lg:block`}></div>
                <div className={`absolute bottom-1/3 right-12 w-6 h-6 ${slide.accentColor.replace('text-', 'bg-')} rounded-full opacity-25 animate-bounce-slow shadow-sm hidden lg:block`}></div>
              </div>
            </div>
          ))}
        </div>

        {showControls && (
          <>
            {/* Arrow controls hidden */}
          </>
        )}

        {showDots && (
          <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 lg:space-x-3 bg-white/30 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
            {slidesToShow.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${index === currentSlide
                    ? 'w-8 lg:w-8 h-2.5 bg-gray-800 rounded-full shadow-lg transform scale-110'
                    : 'w-2.5 lg:w-3 h-2.5 lg:h-3 bg-gray-400 hover:bg-gray-600 rounded-full shadow-md hover:scale-110 transform'
                  }`}
              />
            ))}
          </div>
        )}

        {/* Enhanced Progress Indicator */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-200/50 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-700 ease-out shadow-lg rounded-r-full"
            style={{ width: `${((currentSlide + 1) / slidesToShow.length) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;
