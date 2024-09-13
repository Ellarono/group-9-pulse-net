import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch the list of applications
    fetch('http://localhost:5001/applications')
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.log('Error fetching applications:', error));
  }, []);

  return (
    <div>
      <h2>My Applications</h2>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            <p>{application.name} - {application.jobId}</p>
            <Link to={`/applications/edit/${application.id}`}>Edit Application</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsList;
