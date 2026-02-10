import React from "react";
import { FaMicrosoft, FaApple, FaGoogle, FaAmazon } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Millennium City Centre, Gurugram",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Millennium City Centre, Gurugram",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Millennium City Centre, Gurugram",
      openPositions: 20,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Google",
      location: "Remote",
      openPositions: 14,
      icon: <FaGoogle />,
    },
    {
      id: 5,
      title: "Amazon",
      location: "Hybrid",
      openPositions: 18,
      icon: <FaAmazon />,
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>
            Top
            <span>Companies</span>
          </h2>
          <p>Explore companies actively hiring on the platform.</p>
        </div>
        <div className="card-grid">
          {companies.map((element) => {
            return (
              <div className="company-card" key={element.id}>
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <strong>{element.title}</strong>
                    <p>{element.location}</p>
                  </div>
                </div>
                <p className="job-badge">
                  Open Positions {element.openPositions}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCompanies;
