import React, { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({
  allowedFormats = [],
  maxFileSizeMB = 2,
  multiple = false,
  onFileSelect,
  onInvalidFile,
  label
}) => {
  const [fileNames, setFileNames] = useState([]);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = [];
    const newFileNames = [];
    let isInvalidFile = false;

    selectedFiles.forEach((file) => {
      const isFormatValid = allowedFormats.includes(file.type);
      const isSizeValid = file.size <= maxFileSizeMB * 1024 * 1024;

      if (!isFormatValid || !isSizeValid) {
        isInvalidFile = true;
      } else {
        validFiles.push(file);
        newFileNames.push(file.name);
      }
    });

    if (isInvalidFile) {
      if (inputRef.current) inputRef.current.value = '';
      setFileNames([]);
      return onInvalidFile && onInvalidFile();
    }

    setFileNames(newFileNames);
    onFileSelect && onFileSelect(multiple ? validFiles : validFiles[0]);
  };

  return (
    <div className="file-fancy-upload">
      <label className="file-upload-label">
        <h4>{label}</h4>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          multiple={multiple}
          className="file-upload-input"
        />
        <span className="file-upload-btn">
          📁 Upload File{multiple ? 's' : ''}
        </span>
      </label>

      {fileNames.length > 0 && (
        <div className="file-file-list">
          {fileNames.map((name, idx) => (
            <div key={idx} className="file-name">
              ✅ {name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;