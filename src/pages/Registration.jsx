import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function Registration({ onSubmit }) {
  const { uniqId, API_BASE_URL } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    savetype: 'formdata',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email) {
      alert('Name and Email are required');
      return;
    }

    // Build payload dynamically, include latest uniqId
    const payload = { ...form, name, email, uid: uniqId };

    try {
      const res = await axios.post(`${API_BASE_URL}/webservice.php`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = res.data;
      console.log(result);

      if (result.status === 'success') {
        console.log('User saved:', result);
        if (onSubmit) onSubmit(result);

        try {
          // 1️⃣ Check announcement status
          const annRes = await axios.post(`${API_BASE_URL}webservice.php`, {
            savetype: 'getAnnouncementStatus',
          });

          if (
            annRes.data.status == 'success' &&
            annRes.data.announcementStatus == 1
          ) {
            // Navigate to Winners page if announcementStatus = 1
            navigate('/winners', { replace: true });
          } else {
            // 2️⃣ If no announcement, check quiz status
            const quizRes = await axios.post(`${API_BASE_URL}webservice.php`, {
              savetype: 'getQuizStatus',
            });

            if (quizRes.data.status === 'success') {
              if (quizRes.data.quizstatus == 1) {
                // Quiz is active → go to Quiz page
                navigate('/quiz', { replace: true });
              } else {
                // Quiz is not active → show coming soon page
                navigate('/quizStatus', { replace: true }); // create this page to show "Coming Soon"
              }
            }
          }
        } catch (err) {
          console.error('Error checking status:', err);
          alert('Something went wrong. Please try again.');
        }
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="registration">
      <div className="regCard">
        <img src="/Logo_color2.webp" alt="Logo" className="logo" />

        <h2>Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company (Optional)"
            value={form.company}
            onChange={handleChange}
          />

          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
