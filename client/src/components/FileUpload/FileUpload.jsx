import React, { useState } from 'react';
import './FileUpload.css';

const FileUpload = ({
  allowedFormats = [],
  maxFileSizeMB = 2,
  multiple = false,
  onFileSelect,
  onInvalidFile
}) => {
  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const isInvalidFile = [];
    const newFileNames = [];

    selectedFiles.forEach((file) => {
      const isFormatValid = allowedFormats.includes(file.type);
      const isSizeValid = file.size <= maxFileSizeMB * 1024 * 1024;

      if (!isFormatValid || !isSizeValid) {
        isInvalidFile = true;
        return;
      }

      validFiles.push(file);
      newFileNames.push(file.name);
    });

    if(isInvalidFile){
      return onInvalidFile && onInvalidFile();
    }

    setFileNames(newFileNames);
    if (validFiles.length > 0) {
      onFileSelect && onFileSelect(multiple ? validFiles : validFiles[0]);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={handleFileChange}
        multiple={multiple}
        className="upload-input"
      />
      {fileNames.length > 0 && (
        <div className="upload-success">
          <p>Selected:</p>
          <ul>
            {fileNames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;