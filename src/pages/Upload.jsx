import React, { useState } from 'react';
import { toast } from 'sonner';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      const response = await fetch('http://127.0.0.1:8000/handle/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // Set the download link for the user to copy
      toast.success('Uploaded Successfully.');
      setDownloadLink(`http://localhost:5173/download/${data.data.folder}`);
    } catch (error) {
      console.error('Error uploading files:', error);
      setMessage('Error uploading files.');
      toast.error('Failed');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
      {downloadLink && (
        <p>
          Copy the download link: <a href={downloadLink} target="_blank" rel="noopener noreferrer">{downloadLink}</a>
        </p>
      )}
    </div>
  );
};

export default Upload;
