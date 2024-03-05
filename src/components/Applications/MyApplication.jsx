import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ResumeModal from "./ResumeModal";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const MyApplication = () => {
  const [application, setApplication] = useState([]); // Initialize state with an empty array
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.user && user.user.role === "Recruiter") {
          const token = user?.accessToken;
          const res = await axios.get(
            "https://job-seeker-backend.onrender.com/api/v1/applications/recruiter/getAllApplications",
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setApplication(res.data.data);
        } else {
          const token = user?.accessToken;
          const res = await axios.get(
            "https://job-seeker-backend.onrender.com/api/v1/applications/jobSeeker/getAllApplications",
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setApplication(res.data.data);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [isAuthorized, user]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const token = user?.accessToken;
      const res = await axios.delete(
        `https://job-seeker-backend.onrender.com/api/v1/applications/deleteApplication/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      setApplication((prevApplications) =>
        prevApplications.filter(
          (singleApplication) => singleApplication._id !== id
        )
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h3>My Applications</h3>
            {application.length <= 0 ? (
              <>
                {" "}
                <h4>No Application Found</h4>
              </>
            ) : (
              application.map((element) => (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ))
            )}
          </div>
        ) : (
          <div className="container">
            <h3>Applications From Job Seeker</h3>
            {application.length <= 0 ? (
              <>
                {" "}
                <h4>No Application Found</h4>
              </>
            ) : (
              application.map((element) => (
                <RecruiterCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              ))
            )}
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
};

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const isPDF = element.resume.toLowerCase().endsWith(".pdf");

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name: </span>
          {element.name}
        </p>
        <p>
          <span>Email: </span>
          {element.email}
        </p>
        <p>
          <span>Phone: </span>
          {element.phone}
        </p>
        <p>
          <span>Address: </span>
          {element.address}
        </p>
        <p>
          <span>Cover Letter: </span>
          {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        {isPDF ? (
          <Document
            file={element.resume}
            onClick={() => openModal(element.resume)}
          >
            <Page pageNumber={1} width={300} />
          </Document>
        ) : (
          <img
            src={element.resume}
            alt="resume"
            onClick={() => openModal(element.resume)}
          />
        )}
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const RecruiterCard = ({ element, openModal }) => {
  const isPDF = element.resume.toLowerCase().endsWith(".pdf");
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name: </span>
          {element.name}
        </p>
        <p>
          <span>Email: </span>
          {element.email}
        </p>
        <p>
          <span>Phone: </span>
          {element.phone}
        </p>
        <p>
          <span>Address: </span>
          {element.address}
        </p>
        <p>
          <span>Cover Letter: </span>
          {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        {isPDF ? (
          <Document
            file={element.resume}
            onClick={() => openModal(element.resume)}
          >
            <Page pageNumber={1} width={300} />
          </Document>
        ) : (
          <img
            src={element.resume}
            alt="resume"
            onClick={() => openModal(element.resume)}
          />
        )}
      </div>
    </div>
  ); // Placeholder for recruiter card component
};
