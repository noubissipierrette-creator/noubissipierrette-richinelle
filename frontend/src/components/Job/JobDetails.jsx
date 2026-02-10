import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { isEmployer } from "../../utils/roles";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <div className="detail-card">
          <h2>{job.title}</h2>
          <p className="muted">{job.category}</p>
          <div className="detail-grid">
            <div className="detail-pill">Country: {job.country}</div>
            <div className="detail-pill">City: {job.city}</div>
            <div className="detail-pill">Location: {job.location}</div>
            <div className="detail-pill">Posted: {job.jobPostedOn}</div>
          </div>
          <div>
            <h4>Description</h4>
            <p className="muted">{job.description}</p>
          </div>
          <div>
            <h4>Salary</h4>
            <p className="muted">
              {job.fixedSalary
                ? job.fixedSalary
                : `${job.salaryFrom} - ${job.salaryTo}`}
            </p>
          </div>
          {isEmployer(user) ? (
            <p className="muted">
              You are logged in as an Employer. Switch to a Job Seeker account to apply.
            </p>
          ) : null}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link to={`/application/${job._id}`} className="btn btn-primary">
              Apply Now
            </Link>
            <Link to="/job/getall" className="btn btn-ghost">
              Back to Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
