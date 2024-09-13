import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if no user info is found
      return;
    }

    // Fetch applications and filter by the logged-in user's email
    fetch('http://localhost:5001/applications')
      .then((response) => response.json())
      .then((data) => {
        const userApplications = data.filter(app => app.email === user.email);
        setApplications(userApplications);
      })
      .catch(err => console.error('Error fetching applications:', err));
  }, [user, navigate]);

  // Ensure user and user.fullName are valid before accessing them
  const fullName = user?.fullName || 'User';
  const firstName = fullName.split(' ')[0] || '';

  return (
    <div>
      <h2>Profile Page</h2>
      <h3>Welcome, {fullName}</h3>
      <p>Email: {user?.email}</p>
      <h3>My Applications</h3>
      {applications.length > 0 ? (
        <ul>
          {applications.map((app) => (
            <li key={app.id}>
              <strong>{app.jobId}</strong> - Status: {app.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
}

export default Profile;
