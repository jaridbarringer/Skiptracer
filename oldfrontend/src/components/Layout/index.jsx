import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { Header, SideMenu } from "../../containers";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box display="flex">
      <SideMenu />
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            mx: 3,
            pb: 10,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Header />
          {children}
        </Stack>
      </Box>
    </Box>
  );
};

export default Layout;
