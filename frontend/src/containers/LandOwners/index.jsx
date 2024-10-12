import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { makeGetRequest } from "../../../utils/api";
import { urls } from "../../../utils/urls";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "cityState",
    headerName: "City State",
    width: 150,
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    valueGetter: (params) => params?.row?.email || "-",
  },
  {
    field: "phone",
    headerName: "Phone ",
    type: "number",
    headerAlign: "left",
    width: 110,
    valueGetter: (params) =>
      params?.row?.phone ? params?.row?.phone.toString() : "-",
  },
];

const LandOwners = () => {
  const [loading, setLoading] = useState(false);
  const [landOwners, setLandOwners] = useState([]);

  const fetchLandOwners = async () => {
    setLoading(true);

    try {
      const response = await makeGetRequest(urls.getLandowners, {}, true);

      if (response.status === 200) {
        setLandOwners(response.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandOwners();
  }, []);

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
