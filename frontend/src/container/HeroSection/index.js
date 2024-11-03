import React from "react";
import { Button, Container, Typography, Stack, Box } from "@mui/material";

const HeroSection = () => {
  return (
    <Container maxWidth="lg">
      <Box mt={6}>
        <Typography variant="h4" align="center">
          Unlock Contact Information in Seconds
        </Typography>
        <Typography variant="subtitle2" align="center" py={1}>
          Effortlessly trace phone numbers, emails, and more from your uploaded
          CSV file.
        </Typography>
        <Typography variant="subtitle2">
          Your key to real estate success is with a Next Gen Skip tracing
          software which goes for just 0.009 per lead (less than a cent).
        </Typography>
        <Stack mt={2} alignItems="center">
          <Button variant="contained">Get Started</Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default HeroSection;
