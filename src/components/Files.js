import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Files() {
  const [files, setFiles] = useState([]);

  

  useEffect(() => {
    setInterval(() => {
      axios.get('/files',{
        headers: {
          authorization: `Bearer ${localStorage.getItem('jwt')}`,
        }
      })
        .then((response) => {
          setFiles(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);
  return (
    <ul>
      {files.map((file) => (
        <li key={file}><a href={`http://localhost:2000/download?fn=${file}&jwt=${localStorage.getItem('jwt')}`}>{file}</a></li>
      ))}
    </ul>
  );
}
export default Files;