import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'

const HowitWorks = () => {
  return (
    <div className='howitworks'>
      <div className="container">
        <h3>How JobSeeker Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus/>
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, commodi distinctio. Inventore dolores obcaecati debitis atque adipisci alias earum assumenda voluptatibus, ratione ullam, quos autem laboriosam exercitationem! Accusamus expedita fugit dolores voluptatum, libero aliquid iure soluta quaerat dolorum, officia explicabo commodi ad provident sapiente consequatur sequi impedit similique quam neque.</p>
          </div>
          <div className="card">
            <MdFindInPage/>
            <p>Find a Job/Post a Job</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, commodi distinctio. Inventore dolores obcaecati debitis atque adipisci alias earum assumenda voluptatibus, ratione ullam, quos autem laboriosam exercitationem! Accusamus expedita fugit dolores voluptatum, libero aliquid iure soluta quaerat dolorum, officia explicabo commodi ad provident sapiente consequatur sequi impedit similique quam neque.</p>
          </div>
          <div className="card">
            <IoMdSend/>
            <p>Apply For Job/Recruit Suitable Candidates</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, commodi distinctio. Inventore dolores obcaecati debitis atque adipisci alias earum assumenda voluptatibus, ratione ullam, quos autem laboriosam exercitationem! Accusamus expedita fugit dolores voluptatum, libero aliquid iure soluta quaerat dolorum, officia explicabo commodi ad provident sapiente consequatur sequi impedit similique quam neque.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowitWorks
