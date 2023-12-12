import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Download = () => {
  const { uid } = useParams();
  const [message, setMessage] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/download/${uid}/`);

      if (!response.ok) {
        throw new Error('Failed to fetch download link');
      }

      const downloadUrl = window.URL.createObjectURL(await response.blob());
      // Open the download link in a new tab
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error downloading files:', error);
      setMessage('Error downloading files.');
    }
  };

  return (
    <div>
      <h1>File Download Page</h1>
      {message && <p>{message}</p>}
      <button onClick={handleDownload}>Download as Zip</button>
    </div>
  );
};

export default Download;
