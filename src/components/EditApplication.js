import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditApplication() {
  const { id } = useParams(); // Get the application ID from the URL
  const [application, setApplication] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific application details using the ID
    fetch(`http://localhost:5001/applications/${id}`)
      .then(response => response.json())
      .then(data => setApplication(data))
      .catch(err => setError('Error fetching application.'));
  }, [id]);

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated application to the backend
    fetch(`http://localhost:5001/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application)
    })
      .then(response => response.json())
      .then(() => navigate('/profile'))
      .catch(err => setError('Error updating application.'));
  };

  return (
    <div>
      <h2>Edit Application</h2>
      {error && <p className="error-message">{error}</p>}
      {application ? (
        <form onSubmit={handleSubmit}>
          <label>
            Job ID:
            <input
              type="text"
              name="jobId"
              value={application.jobId}
              onChange={handleChange}
            />
          </label>
          <label>
            Status:
            <input
              type="text"
              name="status"
              value={application.status}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Application</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditApplication;
