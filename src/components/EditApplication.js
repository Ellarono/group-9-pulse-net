import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditApplication = () => {
  const { applicationId } = useParams(); // Get application ID from URL
  const [application, setApplication] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing application data
    fetch(`http://localhost:5001/applications/${applicationId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplication(data);
        setName(data.name);
        setEmail(data.email);
        setEducation(data.education);
        setWorkExperience(data.workExperience);
        setDateOfBirth(data.dateOfBirth);
      })
      .catch((error) => console.log('Error fetching application:', error));
  }, [applicationId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedApplication = {
      ...application,
      name,
      email,
      education: education.substring(0, 50),
      workExperience: workExperience.substring(0, 200),
      dateOfBirth
    };

    fetch(`http://localhost:5001/applications/${applicationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedApplication)
    })
      .then((response) => response.json())
      .then(() => {
        setMessage('Application updated successfully!');
        navigate('/applications'); // Redirect to the list of applications or another appropriate page
      })
      .catch(() => setMessage('Error updating the application'));
  };

  if (!application) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Application</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="education">Education:</label>
        <input
          type="text"
          id="education"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          maxLength="50"
          required
        />
        <br />
        <label htmlFor="workExperience">Work Experience:</label>
        <textarea
          id="workExperience"
          value={workExperience}
          onChange={(e) => setWorkExperience(e.target.value)}
          maxLength="200"
          required
        />
        <br />
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <br />
        <button type="submit">Update Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditApplication;
