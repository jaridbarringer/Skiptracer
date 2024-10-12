import React from "react";
import { Box, Stack } from "@mui/material";
import { Header, SideMenu } from "../../containers";

const Dashboard = () => {
  return (
    <div>
      {" "}
      <Box display="flex">
        <SideMenu />
        {/* Main content */}
        <Box
          sx={(theme) => ({
            //   flexGrow: 1,
            //   backgroundColor: theme.vars
            //     ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            //     : alpha(theme.palette.background.default, 1),
            //   overflow: "auto",
          })}
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
            {/* <MainGrid /> */}
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
