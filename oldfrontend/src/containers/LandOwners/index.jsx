import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { makeGetRequest } from "../../../utils/api";
import { urls } from "../../../utils/urls";
import { useNavigate } from "react-router-dom";

const LandOwners = () => {
  const [loading, setLoading] = useState(false);
  const [landOwners, setLandOwners] = useState([]);

  const fetchLandOwners = async () => {
    setLoading(true);

    try {
      const response = await makeGetRequest(urls.getLandowners, {}, true);

      if (response.status === 200) {
        setLandOwners(response?.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getDownloadCsv = async (id) => {
    try {
      const response = await makeGetRequest(urls.downloadCsvById(id), {}, true);

      if (response.status === 200) {
        const csvData = response.data; // CSV data is in response.data
        const blob = new Blob([csvData], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `results_${id}.csv`; // You can customize the filename here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Clean up the URL object
      } else {
        console.error("Error fetching CSV:", response.statusText);
      }
    } catch (err) {
      console.error("Error downloading CSV:", err);
    }
  };

  useEffect(() => {
    fetchLandOwners();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "rows_uploaded",
      headerName: "Rows Uploaded",
      width: 150,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => {
        const { id } = params.row;
        const navigate = useNavigate();
        const handleNavigate = () => {
          navigate(`/landowners/${id}`);
        };

        return (
          <div>
            <button onClick={handleNavigate}>Preview</button>
            <button
              onClick={() => getDownloadCsv(id)}
              style={{ marginLeft: 10 }}
            >
              Download
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <Layout>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={landOwners}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 15, 25]}
          disableRowSelectionOnClick
          loading={loading}
        />
      </Box>
    </Layout>
  );
};

export default LandOwners;
