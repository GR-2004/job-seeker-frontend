import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {

  const [jobs, setJobs] = useState([]);
  const {isAuthorized} = useContext(Context)
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://job-seeker-backend.onrender.com/api/v1/jobs/getAllJobs", { withCredentials: true });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE JOBS</h1>
          <div className="banner">
            {
              jobs.data && jobs.data.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
                    <p>{element.location}</p>
                    <Link to={`/job/${element._id}`}>Job Details</Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Jobs
