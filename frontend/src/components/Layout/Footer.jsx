import React, { useContext } from "react";
import { Context } from "../../main";
import { FaBriefcase } from "react-icons/fa";
function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div className="container">
        <div className="footer-brand">
          <span className="brand-icon">
            <FaBriefcase />
          </span>
          <span>Jobportal</span>
        </div>
        <p>Connecting talented professionals with innovative companies.</p>
        <p>&copy; {new Date().getFullYear()} Jobportal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
