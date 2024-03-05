import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = user?.accessToken;
        const response = await axios.get(
          `https://job-seeker-backend.onrender.com/api/v1/jobs/getAJob/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJob(response.data.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <>
      <div className="jobDetail page">
        <div className="container">
          <h3>Job Details</h3>
          <div className="banner">
            <p>
              Title: <span> {job.title} </span>
            </p>
            <p>
              Description: <span> {job.description} </span>
            </p>
            <p>
              location: <span> {job.location} </span>
            </p>
            <p>
              Category: <span> {job.category} </span>
            </p>
            <p>
              Salary: <span> {job.salary} </span>
            </p>
            <p>
              Required Experience: <span> {job.requiredExperience} </span>
            </p>
            <p>
              Required Skills: <span> {job.requiredSkills} </span>
            </p>
            <p>
              Employment Type: <span> {job.employmentType} </span>
            </p>
            <p>
              Posted On: <span> {job.jobPostedOn} </span>
            </p>
            <p>
              {user.user && user.user.role === "Recruiter" ? (
                <></>
              ) : (
                <Link to={`/application/${job._id}`}>Apply Now</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
