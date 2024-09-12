// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/job-listing">Job Listings</Link></li>
      </ul>
      <style jsx>{`
        nav {
          background: #333;
          padding: 10px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          display: inline;
          margin-right: 10px;
        }
        a {
          color: white;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
