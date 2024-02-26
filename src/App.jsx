import React, {useEffect, useContext} from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Context } from './main.jsx'
import Login from './components/Auth/Login.jsx'
import Register from './components/Auth/Register.jsx'
import Navbar from './components/Layout/Navbar.jsx'
import Footer from './components/Layout/Footer.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Job/Jobs.jsx'
import JobDetails from './components/Job/JobDetails.jsx'
import MyJob from './components/Job/MyJob.jsx'
import PostJob from './components/Job/PostJob.jsx'
import Application from './components/Applications/Application.jsx'
import MyApplication from './components/Applications/MyApplication.jsx'
import ResumeModal from './components/Applications/ResumeModal.jsx'
import NotFound from './components/Notfound/NotFound.jsx'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

const App = () => {

  const {isAuthorized, setIsAuthorized, setUser} = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("", {withCredentials: true});
        setUser(res.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);


  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/job/getall' element={<Jobs/>}/>
          <Route path='/job/:id' element={<JobDetails/>}/>
          <Route path='/job/post' element={<PostJob/>}/>
          <Route path='/job/me' element={<MyJob/>}/>
          <Route path='/application/:id' element={<Application/>}/>
          <Route path='/application/me' element={<MyApplication/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
        <Footer />
        <Toaster />
      </Router>    
    </>
  )
}

export default App
