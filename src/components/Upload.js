import React, { useRef } from 'react';
import axios from 'axios';
function Upload() {
  const fileInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    var formData = new FormData();
    formData.append("file", file);
    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="file-input">Select a file:</label>
      <input type="file" id="file-input" ref={fileInput} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default Upload;
