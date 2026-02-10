import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { isEmployer } from "../../utils/roles";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  //Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE}/api/v1/job/getmyjobs`,
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
        if (data.myJobs && data.myJobs.length > 0) {
          setSelectedJobId(data.myJobs[0]._id);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);
  if (!isAuthorized || !isEmployer(user)) {
    navigateTo("/");
  }

  //Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`${API_BASE}/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`${API_BASE}/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        if (selectedJobId === jobId) {
          const remaining = myJobs.filter((job) => job._id !== jobId);
          setSelectedJobId(remaining[0]?._id || null);
        }
        setShowModal(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
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
          <div className="section-header">
            <h2>
              Your
              <span>Posted Jobs</span>
            </h2>
            <p>Edit, update, or delete job postings in one place.</p>
          </div>
          {myJobs.length > 0 ? (
            <>
              <div className="card-grid">
                {myJobs.map((element) => (
                  <button
                    type="button"
                    key={element._id}
                    className="job-card myjobs-card"
                    onClick={() => {
                      setSelectedJobId(element._id);
                      setShowModal(true);
                    }}
                  >
                    <h3>{element.title}</h3>
                    <p>{element.category}</p>
                    <div className="job-meta">
                      <span className="job-badge">{element.country}</span>
                      <span className="job-badge">{element.city}</span>
                    </div>
                  </button>
                ))}
              </div>

              {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                  <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                    {myJobs
                      .filter((job) => job._id === selectedJobId)
                      .map((element) => (
                        <div key={element._id}>
                          <div className="modal-header">
                            <h2>{element.title}</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>
                              &times;
                            </button>
                          </div>
                          <p className="muted">{element.category}</p>
                          <div className="detail-grid">
                            <div className="detail-pill">Country: {element.country}</div>
                            <div className="detail-pill">City: {element.city}</div>
                            <div className="detail-pill">Location: {element.location}</div>
                            <div className="detail-pill">
                              Salary:{" "}
                              {element.fixedSalary
                                ? element.fixedSalary
                                : `${element.salaryFrom} - ${element.salaryTo}`}
                            </div>
                          </div>

                          <div className="form-grid" style={{ marginTop: "16px" }}>
                            <label>Title</label>
                            <input
                              type="text"
                              disabled={editingMode !== element._id}
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(element._id, "title", e.target.value)
                              }
                            />

                            <label>Category</label>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(element._id, "category", e.target.value)
                              }
                              disabled={editingMode !== element._id}
                            >
                              <option value="Graphics & Design">Graphics & Design</option>
                              <option value="Mobile App Development">Mobile App Development</option>
                              <option value="Frontend Web Development">Frontend Web Development</option>
                              <option value="MERN Stack Development">MERN STACK Development</option>
                              <option value="Account & Finance">Account & Finance</option>
                              <option value="Artificial Intelligence">Artificial Intelligence</option>
                              <option value="Video Animation">Video Animation</option>
                              <option value="MEAN Stack Development">MEAN STACK Development</option>
                              <option value="MEVN Stack Development">MEVN STACK Development</option>
                              <option value="Data Entry Operator">Data Entry Operator</option>
                            </select>

                            <label>Country</label>
                            <input
                              type="text"
                              disabled={editingMode !== element._id}
                              value={element.country}
                              onChange={(e) =>
                                handleInputChange(element._id, "country", e.target.value)
                              }
                            />

                            <label>City</label>
                            <input
                              type="text"
                              disabled={editingMode !== element._id}
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(element._id, "city", e.target.value)
                              }
                            />

                            <label>Location</label>
                            <input
                              type="text"
                              disabled={editingMode !== element._id}
                              value={element.location}
                              onChange={(e) =>
                                handleInputChange(element._id, "location", e.target.value)
                              }
                            />

                            <label>Salary</label>
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.fixedSalary}
                                onChange={(e) =>
                                  handleInputChange(element._id, "fixedSalary", e.target.value)
                                }
                              />
                            ) : (
                              <div className="job_post salary_wrapper">
                                <div className="ranged_salary">
                                  <input
                                    type="number"
                                    disabled={editingMode !== element._id}
                                    value={element.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(element._id, "salaryFrom", e.target.value)
                                    }
                                  />
                                  <input
                                    type="number"
                                    disabled={editingMode !== element._id}
                                    value={element.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(element._id, "salaryTo", e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                            )}

                            <label>Description</label>
                            <textarea
                              rows={5}
                              disabled={editingMode !== element._id}
                              value={element.description}
                              onChange={(e) =>
                                handleInputChange(element._id, "description", e.target.value)
                              }
                            />
                          </div>

                          <div className="button_wrapper" style={{ marginTop: "16px" }}>
                            <div className="edit_btn_wrapper">
                              {editingMode === element._id ? (
                                <>
                                  <button
                                    onClick={() => handleUpdateJob(element._id)}
                                    className="check_btn"
                                  >
                                    <FaCheck />
                                  </button>
                                  <button
                                    onClick={() => handleDisableEdit()}
                                    className="cross_btn"
                                  >
                                    <RxCross2 />
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => handleEnableEdit(element._id)}
                                  className="edit_btn"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteJob(element._id)}
                              className="delete_btn"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
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

export default MyJobs;
