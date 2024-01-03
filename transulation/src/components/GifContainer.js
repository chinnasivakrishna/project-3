// GifContainer.js
import React from 'react';

const GifContainer = ({ visible, onClick, response }) => {
  return (
    <div
      className="gif-container"
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        display: visible ? 'block' : 'none',
        cursor: 'pointer'
      }}
      onClick={onClick}
    >
      <img
        src="https://miro.medium.com/max/455/0*UQB_ZhdqqQ6HkRuj.gif"
        alt="GIF"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '5px',
        }}
      />
      <p>{response}</p>
    </div>
  );
};

export default GifContainer;
