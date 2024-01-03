import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import App1 from './components/App1';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegistrationForm />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/App1' element={<App1 />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
