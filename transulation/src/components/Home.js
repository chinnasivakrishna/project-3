// Home.js

import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import './Home.css'
const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My App</h1>

      <div className="button-container">
        <Link to="/login" className="button">
          Login
        </Link>
        <Link to="/register" className="button">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
