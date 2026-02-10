import React, { useContext } from "react";
import { FaBuilding, FaBriefcase, FaSearch, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../../main";
import { isEmployer } from "../../utils/roles";

const HeroSection = () => {
  const { user } = useContext(Context);
  const stats = [
    {
      id: 1,
      title: "2.4M+",
      subTitle: "Active Users",
      icon: <FaUsers />,
    },
    {
      id: 2,
      title: "50K+",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "150K+",
      subTitle: "Jobs Posted",
      icon: <FaBriefcase />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container hero-inner">
          <h1>
            Find your Dream Job or
            <span>Perfect Hire</span>
          </h1>
          <p>
            Connect talented professionals with innovative companies. Your next
            career move or ideal candidate is just a click away.
          </p>
          <div className="hero-actions">
            <Link to="/job/getall" className="btn btn-primary">
              <FaSearch /> Find Jobs
            </Link>
            <Link
              to={isEmployer(user) ? "/job/post" : "/login"}
              className="btn btn-ghost"
            >
              Post a Job
            </Link>
          </div>
          <div className="hero-stats">
            {stats.map((element) => (
              <div className="hero-stat" key={element.id}>
                <div className="icon">{element.icon}</div>
                <strong>{element.title}</strong>
                <span>{element.subTitle}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-bg">
          <span className="blob-1" />
          <span className="blob-2" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
