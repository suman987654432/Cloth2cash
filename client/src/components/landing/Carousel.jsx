import React, { useState, useEffect } from 'react';
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import Button from '../ui/Button';

const Carousel = ({ slides, autoPlay = true, autoPlayInterval = 5000, showDots = true }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      id: 1,
      heading: "India's <span class='text-red-500 font-bold'>Textile Waste</span> Crisis",
      content: "Millions of clothes are hoarded or thrown away every year. They pile up in homes or landfills, causing pollution and waste.",
      image: slide1,
      bgColor: "bg-gray-50",
      accentColor: "text-red-500"
    },
    {
      id: 2,
      heading: "<span class='text-green-500 font-bold'>Cloth2Cash</span>: Recycle & Earn",
      content: "We make it easy for you to give away old clothes from your doorstep — and earn money for every kilo!",
      image: slide2,
      bgColor: "bg-gray-50",
      accentColor: "text-green-500"
    },
    {
      id: 3,
      heading: "<span class='text-blue-500 font-bold'>4 Simple Steps</span> to Earn from Old Clothes",
      content: " Upload •  Schedule Pickup •  Get Paid •  Recycle Responsibly",
      image: slide1,
      bgColor: "bg-gray-50",
      accentColor: "text-blue-500"
    },
    {
      id: 4,
      heading: "<span class='text-purple-500 font-bold'>Declutter, Earn</span> & Save the Planet",
      content: " Get cash •  Clear your space •  Reduce waste •  Support eco-friendly recycling",
      image: slide1,
      bgColor: "bg-gray-50",
      accentColor: "text-purple-500"
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
      <div className="relative w-full max-w-screen-7xl mx-auto bg-white rounded-xl lg:rounded-2xl overflow-hidden h-[90vh] lg:h-[92vh] min-h-[600px] lg:min-h-[400px] max-h-[900px] border border-gray-200">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slidesToShow.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 h-full relative overflow-hidden"
            >
              {/* Background Image with Blur */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  alt="Background" 
                  className="w-full h-full object-cover blur-[2px] scale-105"
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Centered Content */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center px-4 sm:px-6 md:px-8 lg:px-16 max-w-4xl">
                  <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium shadow-sm border text-gray-800">
                      Step {slide.id} of 4
                    </span>
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-2xl"
                    dangerouslySetInnerHTML={{ __html: slide.heading.replace(/text-\w+-\d+/g, 'text-yellow-400') }}
                  />

                  <div className="w-16 h-1 bg-yellow-400 rounded-full mb-6 mx-auto"></div>

                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow-lg">
                    {slide.content}
                  </p>

                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full sm:w-auto text-base px-8 py-3 font-medium hover:scale-105 transition-transform duration-200 shadow-lg"
                    >
                      Get Started
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto text-base px-8 py-3 font-medium hover:scale-105 transition-transform duration-200 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showDots && (
          <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            {slidesToShow.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${index === currentSlide
                    ? 'w-6 h-2 bg-white rounded-full'
                    : 'w-2 h-2 bg-white/60 hover:bg-white/80 rounded-full'
                  }`}
              />
            ))}
          </div>
        )}

        {/* Simple Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-700 ease-out"
            style={{ width: `${((currentSlide + 1) / slidesToShow.length) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;
