import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'
import HeroSection from './HeroSection.jsx'
import HowitWorks from './HowitWorks.jsx'
import PopularCategory from './PopularCategory.jsx'
import PopularCompaines from './PopularCompaines.jsx'


const Home = () => {
  const {isAuthorized} = useContext(Context)
  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }
  return (
    <section className='homePage page'>
      <HeroSection/>
      <HowitWorks/>
      <PopularCategory/>
      <PopularCompaines/>
    </section>
  )
}

export default Home
