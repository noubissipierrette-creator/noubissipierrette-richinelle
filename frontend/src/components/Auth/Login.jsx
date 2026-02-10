import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE}/api/v1/user/login`,
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setUser(data.user);
      setIsAuthorized(true);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="form-card">
            <h3>Welcome back</h3>
            <p className="muted">Login to manage your job search or postings.</p>
            <form className="form-grid">
              <div>
                <label>Login As</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Job Seeker">Job Seeker</option>
                  <option value="Employer">Employer</option>
                </select>
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
              <Link className="btn btn-ghost" to={"/register"}>
                Create account
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
