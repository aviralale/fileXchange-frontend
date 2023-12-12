import React, { useState } from 'react';

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');

  const API_ENDPOINT = 'http://127.0.0.1:8000/'

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      // Replace API_ENDPOINT with your actual Django API endpoint for file upload
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Error uploading files.');
    }
  };

  const handleDownload = async () => {
    // Replace 'YOUR_DOWNLOAD_API_ENDPOINT' with your actual Django API endpoint for downloading files as a zip
    const response = await fetch(`${API_ENDPOINT}/media/zip/${uid}.zip`);
    const blob = await response.blob();

    // Create a temporary URL for the blob
    const url = window.URL.createObjectURL(new Blob([blob]));
    
    // Create a link and trigger a click to download the file
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'files.zip');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDownload}>Download as Zip</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUploader;
