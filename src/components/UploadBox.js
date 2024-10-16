import React from 'react';
import { useDropzone } from 'react-dropzone';

const UploadBox = ({ onFileChange }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      onFileChange(file);
    },
    accept: { "application/json": [] },
  });

  return (
    <div className="uploadBox">
      <div
        className="dragBox"
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "40px",
          textAlign: "center",
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the JSON file here...</p>
        ) : (
          <p>Drag & drop a JSON file here, or click to select a file</p>
        )}
      </div>
      <div className="orLine">
        <span>OR</span>
      </div>
      <div className="uploadBtn">
        <input
          id="fileInput"
          className="btn btn-default"
          type="file"
          accept=".json"
          onChange={(e) => onFileChange(e.target.files[0])}
          style={{ display: "none" }}
        />
        <label
          htmlFor="fileInput"
          className="btn btn-default"
        >
          Choose file from Computer
        </label>
      </div>
    </div>
  );
};

export default UploadBox;
