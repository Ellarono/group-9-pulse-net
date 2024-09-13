import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))); // Assuming user info is stored in localStorage

  useEffect(() => {
    if (!user) {
      console.error("No user found in localStorage");
      return;
    }
    // Fetch the list of applications
    fetch('http://localhost:5001/applications')
      .then((response) => response.json())
      .then((data) => {
        // Filter applications that belong to the current user
        const userApplications = data.filter(app => app.email === user.email);
        setApplications(userApplications);
      })
      .catch((error) => console.log('Error fetching applications:', error));
  }, [user]);

  // Function to handle deleting an application
  const handleDelete = (id) => {
    fetch(`http://localhost:5001/applications/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setApplications(applications.filter(app => app.id !== id));
        } else {
          console.error('Failed to delete application');
        }
      })
      .catch((error) => console.log('Error deleting application:', error));
  };

  return (
    <div>
      <h2>My Applications</h2>
      {applications.length > 0 ? (
        <ul>
          {applications.map((application) => (
            <li key={application.id}>
              <p>{application.name} - {application.jobId}</p>
              <Link to={`/applications/edit/${application.id}`}>Edit Application</Link>
              <button onClick={() => handleDelete(application.id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default ApplicationsList;
