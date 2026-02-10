import React from "react";
import { FaCheckCircle, FaSearch, FaUserTie } from "react-icons/fa";

const HowItWorks = () => {
  const features = [
    {
      id: 1,
      title: "Smart Job Matching",
      description:
        "Get tailored job recommendations based on skills, interests, and career goals.",
      icon: <FaSearch />,
      tone: "blue",
    },
    {
      id: 2,
      title: "Easy Applications",
      description:
        "Apply in minutes with a streamlined profile and upload once resume flow.",
      icon: <FaCheckCircle />,
      tone: "blue",
    },
    {
      id: 3,
      title: "Employer Tools",
      description:
        "Post jobs, manage applicants, and hire faster with clean, focused tools.",
      icon: <FaUserTie />,
      tone: "purple",
    },
  ];
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>
              Everything You Need to
              <span>Succeed</span>
            </h2>
            <p>
              Whether you're looking for your next opportunity or the perfect
              candidate, our tools make it happen.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature) => (
              <div
                className={`feature-card ${
                  feature.tone === "purple" ? "purple" : ""
                }`}
                key={feature.id}
              >
                <div className="icon">{feature.icon}</div>
                <div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
