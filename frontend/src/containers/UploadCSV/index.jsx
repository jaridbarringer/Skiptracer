import React, { useState } from "react";
import { urls } from "../../../utils/urls";
import { makePostRequest } from "../../../utils/api";
import { Layout } from "../../components";
import { toast } from "react-toastify";

const UploadCSV = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file before uploading.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile); // Append the file to formData
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    try {
      const response = await makePostRequest(
        urls.uploadcsv,
        formData,
        config,
        true
      );

      if (response.status === 200) {
        setSelectedFile(null);
        toast.success("File uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setLoading(false);
      } else if (response.status === 400) {
        toast.error(
          response?.data?.message || "Error uploading file. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Please wait.." : "Upload CSV"}
        </button>
      </form>
    </Layout>
  );
};

export default UploadCSV;
