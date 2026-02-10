import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import { isEmployer } from "../../utils/roles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const { isAuthorized, user } = useContext(Context);
  useEffect(() => {
    try {
      axios
        .get(`${API_BASE}/api/v1/job/getall`, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  const filteredJobs = useMemo(() => {
    const list = jobs.jobs || [];
    if (!query.trim()) return list;
    const q = query.toLowerCase();
    return list.filter((job) =>
      [job.title, job.category, job.country, job.city]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [jobs, query]);

  return (
    <section className="jobs page">
      <div className="container">
        <div className="jobs-header">
          <h1>Find Jobs</h1>
          <p className="muted">
            Browse and filter open roles to find your next opportunity.
          </p>
          {isEmployer(user) ? (
            <div style={{ marginTop: "8px" }}>
              <Link to="/job/post" className="btn btn-primary">
                Post a New Job
              </Link>
            </div>
          ) : null}
        </div>
        <div className="jobs-search">
          <input
            type="text"
            placeholder="Search by title, category, or location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="card-grid" style={{ marginTop: "24px" }}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className="job-card" key={element._id}>
                  <h3>{element.title}</h3>
                  <p>{element.category}</p>
                  <div className="job-meta">
                    <span className="job-badge">{element.country}</span>
                    <span className="job-badge">{element.city}</span>
                  </div>
                  <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    <Link to={`/job/${element._id}`} className="btn btn-ghost">
                      Job Details
                    </Link>
                    <Link to={`/application/${element._id}`} className="btn btn-primary">
                      Apply Now
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No jobs match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
