import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import { urls } from "../../../utils/urls";
import { makeGetRequest } from "../../../utils/api";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "first_name", headerName: "First Name", width: 150 },
  { field: "last_name", headerName: "Last Name", width: 150 },
  { field: "email_1", headerName: "Email 1", width: 200 },
  { field: "email_2", headerName: "Email 2", width: 200 },
  { field: "email_3", headerName: "Email 3", width: 200 },
  { field: "email_4", headerName: "Email 4", width: 200 },
  { field: "primary_phone", headerName: "Primary Phone", width: 150 },
  { field: "primary_phone_type", headerName: "Primary Phone Type", width: 150 },
  { field: "landline_1", headerName: "Landline 1", width: 150 },
  { field: "landline_2", headerName: "Landline 2", width: 150 },
  { field: "landline_3", headerName: "Landline 3", width: 150 },
  { field: "mobile_1", headerName: "Mobile 1", width: 150 },
  { field: "mobile_2", headerName: "Mobile 2", width: 150 },
  { field: "mobile_3", headerName: "Mobile 3", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "city", headerName: "City", width: 150 },
  { field: "state", headerName: "State", width: 100 },
  { field: "mail_address", headerName: "Mail Address", width: 200 },
  { field: "mail_city", headerName: "Mail City", width: 150 },
  { field: "mail_state", headerName: "Mail State", width: 100 },
  { field: "created_at", headerName: "Created At", width: 150 },
];

const LandOwnerDetails = () => {
  const [loading, setLoading] = useState(false);
  const [landOwnersById, setLandOwnersById] = useState([]);
  const { id } = useParams();

  const fetchLandOwnersById = async () => {
    setLoading(true);

    try {
      const response = await makeGetRequest(
        urls.getLandownersById(id),
        {},
        true
      );

      if (response.status === 200) {
        setLandOwnersById(response?.data?.data?.results);
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
    if (id) {
      fetchLandOwnersById();
    }
  }, [id]);

  const rows = landOwnersById.map((landOwner, index) => ({
    id: index + 1,
    first_name: landOwner.first_name || "-",
    last_name: landOwner.last_name || "-",
    email_1: landOwner.email_1 || "-",
    email_2: landOwner.email_2 || "-",
    email_3: landOwner.email_3 || "-",
    email_4: landOwner.email_4 || "-",
    primary_phone: landOwner.primary_phone || "-",
    primary_phone_type: landOwner.primary_phone_type || "-",
    landline_1: landOwner.landline_1 || "-",
    landline_2: landOwner.landline_2 || "-",
    landline_3: landOwner.landline_3 || "-",
    mobile_1: landOwner.mobile_1 || "-",
    mobile_2: landOwner.mobile_2 || "-",
    mobile_3: landOwner.mobile_3 || "-",
    address: landOwner.address || "-",
    city: landOwner.city || "-",
    state: landOwner.state || "-",
    mail_address: landOwner.mail_address || "-",
    mail_city: landOwner.mail_city || "-",
    mail_state: landOwner.mail_state || "-",
    created_at: landOwner.created_at || "-",
  }));

  return (
    <Layout>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
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

export default LandOwnerDetails;
