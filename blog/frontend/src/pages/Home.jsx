import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import List from '../components/List'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import Banner2 from '../components/Banner2'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Banner/>
      <List/>
      <Footer/>
    </div>
  )
}

export default Home