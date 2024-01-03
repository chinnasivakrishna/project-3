// SpeechTranslation.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './SpeechTranslation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeUp,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';

import { languages } from './languages'; 

const SpeechTranslation = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('auto');
  const [toLanguage, setToLanguage] = useState('en');
  const [error, setError] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const recognition = new window.webkitSpeechRecognition();
  const synth = window.speechSynthesis;
  const googleTranslateApiKey = 'dbfe5eb68fmshecd5a7ce3910cfap149795jsna847d957dc2b';

  useEffect(() => {
    recognition.lang = fromLanguage;
  }, [fromLanguage]); 

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setText(transcript);

    handleTranslation(transcript);
  };

  recognition.onend = () => {
    setRecognizing(false);
  };

  const handleTextToSpeech = () => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = toLanguage;
      synth.speak(utterance);
    }
  };

  const handleSpeechRecognition = () => {
    if (recognizing) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setRecognizing(!recognizing);
  };

  const handleTranslation = async (speechText) => {
    const requestData = {
      from: fromLanguage,
      to: toLanguage,
      text: speechText,
    };

    const options = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': googleTranslateApiKey,
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
      },
      data: requestData,
    };

    try {
      const response = await axios.request(options);
      const translatedText = response.data.trans;
      setTranslatedText(translatedText);
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="flex-container">
        <label>From Language:</label>
        <select value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-container">
        <label>To Language:</label>
        <select value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSpeechRecognition}>
        {recognizing ? (
          <FontAwesomeIcon icon={faStop} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <p>Speech Text: {text}</p>
      <button onClick={() => handleTranslation(text)}>Translate Text</button>
      <p>Translated Text: {translatedText}</p>
      {error && <p className="error-message">{error}</p>}
      <button onClick={() => handleTextToSpeech()} disabled={!translatedText}>
        <FontAwesomeIcon icon={faVolumeUp} />
      </button>
    </div>
  );
};

export default SpeechTranslation;
