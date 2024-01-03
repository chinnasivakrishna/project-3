import axios from 'axios';
import React, { useState } from 'react';
import './TranslationApp.css'; 
import './style.css';

import { languages } from './languages';

const TranslationApp = () => {
  const [fromLanguage, setFromLanguage] = useState('auto');
  const [toLanguage, setToLanguage] = useState('en');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error] = useState('');

  const handleTranslate = async () => {
    const requestData = {
      from: fromLanguage,
      to: toLanguage,
      text: inputText,
    };

    const options = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'dbfe5eb68fmshecd5a7ce3910cfap149795jsna847d957dc2b',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
      },
      data: requestData,
    };

    try {
      const response = await axios.request(options);
      setOutputText(response.data.trans);
      console.log(response.data.trans);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextToSpeech = () => {
    if (outputText) {
      const utterance = new SpeechSynthesisUtterance(outputText);
      utterance.lang = toLanguage;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className='containers'>
      <div>
        <label>From Language:</label>
        <select
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
        >
          <option value="auto">Auto</option>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>To Language:</label>
        <select
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Text to Translate:</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleTranslate}>Translate</button>
        <button onClick={handleTextToSpeech} disabled={!outputText}>
          <span role="img" aria-label="Speaker" style={{ marginRight: '5px' }}>
            🔊
          </span>
          Text to Speech
        </button>
      </div>
      <div>
        <label>Translated Text:</label>
        {error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <div>{outputText}</div>
        )}
      </div>
    </div>
  );
};

export default TranslationApp;
