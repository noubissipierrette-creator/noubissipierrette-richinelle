import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { isEmployer } from "../../utils/roles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();

  // Function to handle file input changes with validation
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileError("");
    
    if (!file) {
      setResume(null);
      return;
    }
    
    // Check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Please select a valid image file (PNG, JPEG, or WEBP)");
      setResume(null);
      return;
    }
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setFileError("File size should be less than 2MB");
      setResume(null);
      return;
    }
    
    setResume(file);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !phone || !address || !coverLetter) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!resume) {
      setFileError("Please upload your resume");
      return;
    }
    
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${API_BASE}/api/v1/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/applications/me");
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        "Something went wrong. Please try again later.";
      toast.error(errorMessage);
      
      // Show specific message for Cloudinary errors
      if (errorMessage.includes("Cloudinary") || errorMessage.includes("api_key")) {
        toast.error("File upload service is currently unavailable. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  if (isEmployer(user)) {
    return (
      <section className="application">
        <div className="container">
          <div className="form-card">
            <h3>Action Not Allowed</h3>
            <p className="muted">
              Employers cannot apply for jobs. Please login as a Job Seeker to submit applications.
            </p>
            <Link to="/job/getall" className="btn btn-ghost">
              Back to Jobs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="application">
      <div className="container">
        <div className="form-card">
          <h3>Application Form</h3>
          <p className="muted">Complete the details below to apply.</p>
          <form onSubmit={handleApplication} className="form-grid">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <textarea
              placeholder="Cover Letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            />
            <div>
              <label>Upload Resume</label>
              <p className="form-hint">
                Supported formats: PNG, JPEG, WEBP. Max size: 2MB.
              </p>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleFileChange}
              />
              {fileError && <p className="form-hint">{fileError}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Submitting..." : "Send Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;
