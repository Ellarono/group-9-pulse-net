import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import JobListings from './components/JobListings';
import Profile from './components/Profile';
import Apply from './components/Apply'; 
import LoginPage from './components/LoginPage'; 
import SignupPage from './components/SignupPage'; 
import EditApplication from './components/EditApplication';
import ApplicationsList from './components/ApplicationsList';
import { isAuthenticated } from './utils/auth';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-listings" element={<JobListings />} />
          <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/applications" element={<ApplicationsList />} />
          <Route path="/applications/edit/:applicationId" element={<EditApplication />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
