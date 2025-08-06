import React from 'react'
import Navbar from '../components/landing/Navbar'
import Carousel from '../components/landing/Carousel'
import WhyYou from '../components/landing/WhyYou'
import Work from '../components/landing/Work'
import Testimonnal from '../components/Testimonnal'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <>
      <Navbar />

      <Carousel />


      <WhyYou />

      <Work/>

      <Testimonnal/>
      <Footer/>
    </>
  )
}

export default LandingPage