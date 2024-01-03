import React, { useState } from 'react';

const DocumentTranslation = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState('');

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Read the content of the file using FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setExtractedText(content);
      };
      reader.readAsText(selectedFile);

      
      setError('');
    }
  };

  return (
    <div className="container">
      <div className="flex-container">
        <input type="file" accept=".pdf, .doc, .docx" onChange={onFileChange} />
      </div>
      <div className="result-container">
        <div>
          <label>Extracted Text:</label>
          {extractedText ? (
            <div>{extractedText}</div>
          ) : (
            <div style={{ color: 'gray' }}>No text extracted</div>
          )}
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
};

export default DocumentTranslation;
