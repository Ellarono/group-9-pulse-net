import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import JobListings from './components/JobListings';
import Apply from './components/Apply';

import EditApplication from './components/EditApplication';
import ApplicationsList from './components/ApplicationsList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/job-listings">Job Listings</a></li>
            <li><a href="/apply">Apply for Jobs</a></li>
            <li><a href="/add-job">Add Job</a></li>
            <li><a href="/applications">My Applications</a></li> {/* Link to view applications */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-listings" element={<JobListings />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/applications" element={<ApplicationsList />} /> {/* Route to view applications */}
          <Route path="/applications/edit/:applicationId" element={<EditApplication />} /> {/* Route to edit application */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
