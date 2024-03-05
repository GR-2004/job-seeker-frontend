import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const MyJob = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //fetching all jobs of an recruiter

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = user?.accessToken;
        const { data } = await axios.get(
          "https://job-seeker-backend.onrender.com/api/v1/jobs/getMyPostedJobs",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyJobs(data.data);
      } catch (error) {
        toast.error(error.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user.user && user.user.role !== "Recruiter")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  //function for enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //function for disabling editing mode
  const handleDisableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //function for editing job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    const token = user?.accessToken;
    await axios
      .put(
        `https://job-seeker-backend.onrender.com/api/v1/jobs/updatejob/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  //function for deleting job
  const handleDeleteJob = async (jobId) => {
    const token = user?.accessToken;
    await axios
      .delete(
        `https://job-seeker-backend.onrender.com/api/v1/jobs/deleteJob/${jobId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {myJobs && myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Location: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.location}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Category: </span>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value="">Select Category</option>
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="Account & Finance">
                                Account & Finance
                              </option>
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                              <option value="MEAN Stack Development">
                                MEAN STACK Development
                              </option>
                              <option value="MEVN Stack Development">
                                MEVN STACK Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                            </select>
                          </div>
                          <div>
                            <span>Salary: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.salary}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salary",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Expired: </span>
                            <select
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                            >
                              <option value={true}>TRUE</option>
                              <option value={false}>FALSE</option>
                            </select>
                          </div>
                          <div>
                            <span>Employment Type: </span>
                            <select
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.employmentType}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "employmentType",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Employment Type</option>
                              <option value="full-time">Full-time</option>
                              <option value="part-time">Part-time</option>
                              <option value="contract">Contract</option>
                              <option value="freelance">Freelance</option>
                            </select>
                          </div>
                        </div>
                        <div className="long_field">
                          <div>
                            <span>Description</span>
                            <textarea
                              rows="5"
                              value={element.description}
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "description",
                                  e.target.value
                                )
                              }
                            ></textarea>
                          </div>
                          <div>
                            <span>Required Experience</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.requiredExperience}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "requiredExperience",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <span>Required Skills</span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.requiredSkills}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "requiredSkills",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="button_wrapper">
                        <div className="edit_btn_wrapper">
                          {editingMode === element._id ? (
                            <>
                              <button
                                className="check_btn"
                                onClick={() => handleUpdateJob(element._id)}
                              >
                                <FaCheck />
                              </button>
                              <button
                                className="cross_btn"
                                onClick={() => handleDisableEdit()}
                              >
                                <RxCross2 />
                              </button>
                            </>
                          ) : (
                            <button
                              className="edit_btn"
                              onClick={() => handleEnableEdit(element._id)}
                            >
                              Edit
                            </button>
                          )}
                        </div>
                        <button
                          className="delete_btn"
                          onClick={() => handleDeleteJob(element._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJob;
