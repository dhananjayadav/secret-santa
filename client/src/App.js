import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import FileUpload from "./components/FileUpload/FileUpload";
import Alert from "./components/Alert/Alert";
import Footer from "./components/Footer/Footer";
import FILE_MIME_TYPES from "./utils/constants/fileMimeTypes";
import Button from "./components/Button/Button";
import { assignSecretSantaAPI } from "./utils/apiUtils";
import { saveAs } from "file-saver";

function App() {
  const [alertMessage, setAlertMessage] = useState("");
  const [employeeFile, setEmployeeFile] = useState(null);
  const [lastYearFile, setLastYearFile] = useState(null);
  const [isSecretSantaLoading, setIsSecretSantaLoading] = useState(false);
  const [generatedCSVFile, setGeneratedCSVFile] = useState();

  const handleInvalidFile = () => {
    setAlertMessage(
      "File should be of CSV or XLSX type and file size should not be more than 20 MB"
    );
  };

  const assignSecretSanta = async () => {
    setIsSecretSantaLoading(true);
    const response = await assignSecretSantaAPI(employeeFile, lastYearFile);
    setIsSecretSantaLoading(false);
    if (response.data) {
      setGeneratedCSVFile(response.data);
    } else {
      setAlertMessage(
        "Oops! We couldn’t process your request at the moment. Something went wrong — please try again shortly."
      );
    }
  };

  const resetForm = () => {
    setEmployeeFile(null);
    setLastYearFile(null);
    setGeneratedCSVFile(null);
  };

  const downloadCsvFile = () => {
    const blob = new Blob([generatedCSVFile], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, `secret_santa_${Date.now()}.csv`);
  };

  return (
    <div className="app">
      <Header />
      <main className="upload-section">
        <p className="upload-note">
          Please make sure the file is in <strong>CSV</strong> or{" "}
          <strong>XLSX</strong> format and not larger than <strong>20MB</strong>
          .
        </p>
        <div className="upload-inputs">
          <FileUpload
            allowedFormats={[FILE_MIME_TYPES.CSV, FILE_MIME_TYPES.XLSX]}
            maxFileSizeMB={20}
            multiple={false}
            file={employeeFile}
            onFileSelect={(file) => setEmployeeFile(file)}
            label="Upload Employees File"
            onInvalidFile={handleInvalidFile}
          />
          <FileUpload
            allowedFormats={[FILE_MIME_TYPES.CSV, FILE_MIME_TYPES.XLSX]}
            maxFileSizeMB={20}
            multiple={false}
            label="Upload Last Year Game File"
            onFileSelect={(file) => setLastYearFile(file)}
            file={lastYearFile}
            onInvalidFile={handleInvalidFile}
          />
        </div>
        <Button
          disabled={!employeeFile || !lastYearFile}
          loading={isSecretSantaLoading}
          onClick={assignSecretSanta}
        >
          Assign Secret Santa
        </Button>
        {alertMessage && (
          <Alert>
            <div>{alertMessage}</div>
            <Button onClick={() => setAlertMessage("")}>OK</Button>
          </Alert>
        )}
        {generatedCSVFile && (
          <Alert>
            <div>Secret Santa Assigned Successfully</div>
            <div className="file-download-alert">
              <Button onClick={downloadCsvFile}>Download File</Button>
              <Button onClick={resetForm}>Close</Button>
            </div>
          </Alert>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;