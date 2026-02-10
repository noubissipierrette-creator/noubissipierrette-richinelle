import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { isEmployer } from "../../utils/roles";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/v1/user/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={isAuthorized ? "site-header" : "navbarHide"}>
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setShow(false)}>
          <span className="brand-icon">
            <FaBriefcase />
          </span>
          <span>Jobportal</span>
        </Link>

        <ul className={!show ? "nav-links" : "nav-links show-menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              Find Jobs
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "Applications"
                : "My Applications"}
            </Link>
          </li>
          <li>
            <Link to={"/profile"} onClick={() => setShow(false)}>
              Profile
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  Manage Jobs
                </Link>
              </li>
            </>
          ) : null}
        </ul>

        <div className="nav-actions">
          {user?.name && (
            <span className="nav-user">
              Hi, {user.name} {isEmployer(user) ? "(Employer)" : "(Job Seeker)"}
            </span>
          )}
          <button className="btn btn-ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="hamburger" onClick={() => setShow(!show)}>
          {show ? <AiOutlineClose /> : <GiHamburgerMenu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
