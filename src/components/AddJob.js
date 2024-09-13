import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      title,
      company,
      location,
      description
    };

    // POST request to add a new job to the backend
    fetch('http://localhost:5001/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob)
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage('Job added successfully!');
        // Clear form fields
        setTitle('');
        setCompany('');
        setLocation('');
        setDescription('');
        // Redirect to the apply page after job is added
        navigate('/apply');
      })
      .catch(() => setMessage('Error adding the job'));
  };

  return (
    <div>
      <h2>Add a New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddJob;
