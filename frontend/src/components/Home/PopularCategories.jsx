import React from "react";
import { FaChartLine, FaCheckCircle, FaBriefcase, FaUsers } from "react-icons/fa";

const PopularCategories = () => {
  const stats = [
    {
      id: 1,
      title: "2.4M+",
      subTitle: "Active Users",
      icon: <FaUsers />,
    },
    {
      id: 2,
      title: "94%",
      subTitle: "Match Rate",
      icon: <FaCheckCircle />,
    },
    {
      id: 3,
      title: "150K+",
      subTitle: "Jobs Posted",
      icon: <FaBriefcase />,
    },
    {
      id: 4,
      title: "89K+",
      subTitle: "Successful Hires",
      icon: <FaChartLine />,
    },
  ];
  return (
    <section className="section alt">
      <div className="container">
        <div className="section-header">
          <h2>
            Platform
            <span>Analytics</span>
          </h2>
          <p>
            Real-time insights to power your job search and hiring decisions.
          </p>
        </div>
        <div className="card-grid">
          {stats.map((element) => {
          return (
            <div className="stat-card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <strong>{element.title}</strong>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
