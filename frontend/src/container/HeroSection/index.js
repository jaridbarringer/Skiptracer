import React from "react";
import { Button, Container, Typography } from "@mui/material";

const HeroSection = () => {
  console.log("server");
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center">
        Unlock Contact Information in Seconds
      </Typography>
      <Typography variant="h6">
        Effortlessly trace phone numbers, emails, and more from your uploaded
        CSV file.
      </Typography>
      <Typography variant="body1">
        Briefly explain the skip tracing process and benefits. Highlight how
        easy and efficient it is to use the service to find missing contact
        details for various purposes (like reconnecting with leads, building
        business lists, or other uses).
      </Typography>
      <Button>Get Started</Button>
    </Container>
  );
};

export default HeroSection;
