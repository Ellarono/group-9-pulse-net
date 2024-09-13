import { useState, useEffect } from 'react';

function Profile() {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Assuming the user info is stored in localStorage

  useEffect(() => {
    // Fetch applications and filter by the logged-in user's email
    fetch('http://localhost:5001/applications')
      .then((response) => response.json())
      .then((data) => {
        // Filter applications that belong to the current user
        const userApplications = data.filter(app => app.email === user.email);
        setApplications(userApplications);
      })
      .catch(err => console.error('Error fetching applications:', err));
  }, [user.email]);

  return (
    <div>
      <h2>Profile Page</h2>
      <h3>Welcome, {user.name}</h3>
      <p>Email: {user.email}</p>
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
