import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faDownload, faStop } from '@fortawesome/free-solid-svg-icons';
import './DocumentTranslation.css';

import { languages } from './languages';


const DocumentTranslation = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [selectedFromLanguage, setSelectedFromLanguage] = useState('auto');
  const [selectedToLanguage, setSelectedToLanguage] = useState('te');
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [, setCurrentUtterance] = useState(null);

  useEffect(() => {
    if (file) {
      translateText(selectedToLanguage, file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToLanguage, file]);

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setExtractedText('');
      setOutputText('');
      setError('');
      setLoadingExtract(true);

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setExtractedText(content);
        setLoadingExtract(false);
      };
      reader.readAsText(selectedFile);

      translateText(selectedToLanguage, selectedFile);
    }
  };

  const calculateContrastColor = (backgroundColor) => {
    const luminance =
      (0.299 * backgroundColor[0] + 0.587 * backgroundColor[1] + 0.114 * backgroundColor[2]) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  const translateText = async (targetLanguage, file) => {
    const extractionUrl = 'https://docxtract1.p.rapidapi.com/extract';

    const data = new FormData();
    data.append('file', file);

    const extractionOptions = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': 'c8021116c7mshad3ca54472645f7p16197cjsn1744594698e7',
        'X-RapidAPI-Host': 'docxtract1.p.rapidapi.com',
      },
      body: data,
    };

    try {
      setLoadingTranslate(true);

      const extractionResponse = await fetch(extractionUrl, extractionOptions);
      const extractionResult = await extractionResponse.text();
      const extractedTextWithNewlines = extractionResult.replace(/\\n/g, '\n');

      setExtractedText(extractedTextWithNewlines);

      const translationResult = await translateTextAPI(extractedTextWithNewlines, targetLanguage);
      setOutputText(translationResult);
    } catch (extractionError) {
      console.error(extractionError);
      setError('Error extracting text from the document.');
    } finally {
      setLoadingTranslate(false);
    }
  };

  const translateTextAPI = async (textToTranslate, targetLanguage) => {
    const requestData = {
      from: selectedFromLanguage,
      to: targetLanguage,
      text: textToTranslate,
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
      return response.data.trans;
    } catch (translationError) {
      console.error(translationError);
      setError('Error translating text.');
      return '';
    }
  };

  const downloadTranslatedTextFile = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'translated_text.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const speakText = (text, lang) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang; 
      setCurrentUtterance(utterance);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="container">
      <div className="flex-container">
        <div>
        <input type="file" accept=".pdf, .doc, .docx" onChange={onFileChange} />
        </div>
        <div>
        <label>Translate From Language:</label>
        <select
          value={selectedFromLanguage}
          onChange={(e) => setSelectedFromLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        </div>
        <div>
        <label>Translate To Language:</label>
        <select
          value={selectedToLanguage}
          onChange={(e) => setSelectedToLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        </div>
      </div>
      
      
          <div className='hii'>
          <div>
            <div className='miniC'>
          <center><label>Extracted Text:</label></center>
          
            {loadingExtract ? (
              <div className="loading-spinner">
                <ClipLoader
                  color={calculateContrastColor([116, 235, 213])}
                  loading={loadingExtract}
                  size={50}
                  css="width: 8px; height: 80px; border-radius: 4px; border: 4px solid"
                />
              </div>
            ) : extractedText ? (
              <div className="textarea-container">
                  <center>
                    <textarea rows={10} value={extractedText} readOnly />
                  </center>
                  <div className="button-container">
                    <center>
                      <button onClick={() => speakText(extractedText, 'en')}>
                        <FontAwesomeIcon icon={faVolumeUp} />
                      </button>
                      <button onClick={downloadTranslatedTextFile}>
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                      {speaking && (
                        <button onClick={stopSpeaking}>
                          <FontAwesomeIcon icon={faStop} />
                        </button>
                      )}
                    </center>
                  </div>
                </div>
            ) : (
              <div style={{ color: 'gray' }}>No text extracted</div>
            )}
            </div>
            </div>  
            <div className='miniC'>
            <div>
            <center><label>Translated Text:</label></center>
            <div>
            {loadingTranslate ? (
              <div className="loading-spinner">
                <ClipLoader
                  color={calculateContrastColor([116, 235, 213])}
                  loading={loadingTranslate}
                  size={50}
                  css="width: 8px; height: 80px; border-radius: 4px; border: 4px solid"
                />
              </div>
            ) : outputText ? (
              <>
                <div className="textarea-container">
                  <center>
                    <textarea rows={10} value={outputText} readOnly />
                  </center>
                  <div className="button-container">
                    <center>
                      <button onClick={() => speakText(outputText, selectedToLanguage)}>
                        <FontAwesomeIcon icon={faVolumeUp} />
                      </button>
                      <button onClick={downloadTranslatedTextFile}>
                        <FontAwesomeIcon icon={faDownload} />
                      </button>
                      {speaking && (
                        <button onClick={stopSpeaking}>
                          <FontAwesomeIcon icon={faStop} />
                        </button>
                      )}
                    </center>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ color: 'gray' }}>No text translated</div>
            )}
            </div>
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      </div>
  );
};

export default DocumentTranslation;
