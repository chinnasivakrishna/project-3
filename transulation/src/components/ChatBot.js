// ChatBot.js
import React, { useState, useEffect } from 'react';
import GifContainer from './GifContainer';
import './ChatBot.css';

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState(null);
  const [gifClicked, setGifClicked] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (output && output.response) {
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(output.response);
      speechSynthesis.speak(utterance);
    }
  }, [output]);

  const fetchDataFromAPIManual = async (userQuery) => {
    try {
      const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '3dc48d56ccmshc5fac888004cf45p198493jsn47b3e3fcb02b',
          'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
        },
        body: JSON.stringify({
          query: userQuery
        })
      };

      const response = await fetch(url, options);
      const data = await response.json();

      setOutput(data);
      setHistory([...history, { query: userQuery, response: data.response }]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      fetchDataFromAPI();
    }
  };

  const handleButtonClick = () => {
    fetchDataFromAPI();
  };

  const handleGifClick = () => {
    setGifClicked(true);
  };

  const handleCloseClick = () => {
    setGifClicked(false);
    setOutput(null);
  };

  const fetchDataFromAPI = async () => {
    if (query.trim() !== "") {
      fetchDataFromAPIManual(query);
      setQuery('');
    }
  };
    return (
    <div>
      <div className="hiii">
        <GifContainer visible={!gifClicked} onClick={handleGifClick} response={output && output.message} />
        {gifClicked && (
          <div className='chat-container'>
            <button
              onClick={handleCloseClick}
              className="close-button"
            >
              &times;
            </button>
            <div className="history-container">
              {history.map((entry, index) => (
                <div key={index} className="history-entry">
                  <div className="user-query">
                    <strong>Your Query:</strong> {entry.query}
                  </div>
                  <div className="bot-response">
                    <strong>Chat Bot Response:</strong> {entry.response}
                  </div>
                </div>
              ))}
            </div>
            <div className='input-container'>
              <textarea
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter your query here..."
                className="input-textarea"
              />
              <button
                onClick={handleButtonClick}
                className="send-button"
              >
                &#x2192;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
