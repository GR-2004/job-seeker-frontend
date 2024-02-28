import React from "react";
import {FaSuitcase, FaBuilding, FaUsers, FaUserPlus} from 'react-icons/fa'

const HeroSection = () => {

  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>Find a job that suits your interest and skills</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            maiores expedita illo sapiente inventore reiciendis vero dolor
            totam, quam suscipit at? Quam, ex? Voluptatum veniam omnis veritatis
            harum, quibusdam deserunt?
          </p>
        </div>
        <div className="image">
          <img src="/heroS.jpg" alt="hero" />
        </div>
      </div>
      <div className="details">
        {
          details.map(elemenet => {
            return(
              <div className="card" key={elemenet.id}>
                <div className="icon">{elemenet.icon}</div>
                <div className="content">
                  <p>{elemenet.title}</p>
                  <p>{elemenet.subTitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default HeroSection;
