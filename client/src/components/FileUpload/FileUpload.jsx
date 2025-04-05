import React, { useRef } from "react";
import "./FileUpload.css";

const FileUpload = ({
  allowedFormats = [],
  maxFileSizeMB = 2,
  multiple = false,
  onFileSelect,
  onInvalidFile,
  label,
  file,
  files = []
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const isInvalidFileExists = selectedFiles.find((file) => {
      const isFormatValid = allowedFormats.includes(file.type);
      const isSizeValid = file.size <= maxFileSizeMB * 1024 * 1024;
      return !isFormatValid || !isSizeValid
    });

    if (isInvalidFileExists) {
      if (inputRef.current) inputRef.current.value = "";
      return onInvalidFile && onInvalidFile();
    }

    onFileSelect && onFileSelect(multiple ? selectedFiles : selectedFiles[0]);
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
          📁 Upload File{multiple ? "s" : ""}
        </span>
      </label>

      {file ? (
        <div className="file-file-list">
          <div key={file.name} className="file-name">
            ✅ {file.name}
          </div>
        </div>
      ) : (
        files?.length > 0 && (
          <div className="file-file-list">
            {files?.map((file, idx) => (
              <div key={idx} className="file-name">
                ✅ {file.name}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default FileUpload;