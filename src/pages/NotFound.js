import { Box, Button, Typography } from "@mui/material";
import React from "react";

const NotFound = (props) => {
    const navigateToContact = (contactId) => {
        props.history.push(`/contacts`);
      };
    
  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Typography variant="h1">Page Not Found</Typography>
      <Button onClick={navigateToContact} variant="outlined" color="success">
        Go Back Home
      </Button>
    </Box>
  );
};

export default NotFound;
