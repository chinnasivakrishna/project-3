import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a server running at http://localhost:8080
      const response = await axios.post('http://localhost:8080/api/regi/login', formData);

      // Handle the response from the server, e.g., redirect to Home
      console.log('Login successful:', response.data);

      // Reset the form after successful login
      setFormData({
        username: '',
        password: '',
      });

      // Navigate to another page after successful login (e.g., Home)
      navigate('/App1');
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
