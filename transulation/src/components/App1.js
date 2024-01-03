import React, { useState, useEffect, useRef } from 'react';
import './App1.css';
import DocumentTranslation from './DocumentTranslation.js';
import SpeechTranslation from './SpeechTranslation.js';
import TextExtracterFromLanguage from './TextExtracterFromImage.js';
import TranslationApp from './TranslationApp.js';
import ChatBot from './ChatBot.js';

function App1() {
  const [activeSection, setActiveSection] = useState('TranslationApp');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsNavOpen(window.innerWidth >= 769);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout clicked');
  };

  const handleNavButtonClick = (section) => {
    setActiveSection(section);
    setIsNavOpen(false); // Close the navigation bar
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'TranslationApp':
        return <TranslationApp />;
      case 'SpeechTranslation':
        return <SpeechTranslation />;
      case 'TextExtracterFromLanguage':
        return <TextExtracterFromLanguage />;
      case 'DocumentTranslation':
        return <DocumentTranslation />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Include ChatBot component at the top level */}
      <ChatBot />
      <div className="app-container">
        <button className="nav-toggle" onClick={toggleNav}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        <div className={`side-nav ${isNavOpen ? 'open' : ''}`} ref={navRef}>
          <div className="nav-info">
            {/* Close button to close the navigation bar */}
            <button className="close-button" onClick={toggleNav}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
            <div className="nav-buttons">
              <button onClick={() => handleNavButtonClick('TranslationApp')}>Translation App</button>
              <button onClick={() => handleNavButtonClick('SpeechTranslation')}>Speech Translation</button>
              <button onClick={() => handleNavButtonClick('TextExtracterFromLanguage')}>Text Extractor</button>
              <button onClick={() => handleNavButtonClick('DocumentTranslation')}>Document Translation</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="main-content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

export default App1;
