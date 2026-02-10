import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <section className="page notfound">
        <div className="content">
          <img src="/notfound.png" alt="notfound" />
          <h2>Page Not Found</h2>
          <p className="muted">The page you are looking for doesn't exist.</p>
          <Link to={"/"} className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound
