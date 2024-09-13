import { useState } from 'react';

function Apply() {
  const [selectedJob, setSelectedJob] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !email || !education || !workExperience || !dateOfBirth || !selectedJob) {
      setMessage('Please fill out all fields');
      return;
    }

    const application = {
      name,
      email,
      education,
      workExperience,
      dateOfBirth,
      jobId: selectedJob,
      status: 'submitted'
    };

    fetch('http://localhost:5001/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(application)
    })
      .then((response) => response.json())
      .then(() => {
        setMessage('Application submitted successfully!');
        // Clear form after submission
        setSelectedJob('');
        setName('');
        setEmail('');
        setEducation('');
        setWorkExperience('');
        setDateOfBirth('');
      })
      .catch(() => setMessage('Error submitting the application'));
  };

  return (
    <div>
      <h2>Apply for a Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job:</label>
        <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
          <option value="">Select a job</option>
          <option value="1">Legal Intern</option>
          <option value="2">Marketing Intern</option>
          <option value="3">IT Intern</option>
          <option value="4">Accountant</option>
          <option value="5">HR Intern</option>
          <option value="6">Finance Advisor</option>
        </select>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Education:</label>
        <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} />
        <label>Work Experience:</label>
        <input type="text" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} />
        <label>Date of Birth:</label>
        <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        <button type="submit">Submit Application</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Apply;
