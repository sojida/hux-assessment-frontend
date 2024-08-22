import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = (props) => {
  const navigateToLogin = () => {
    localStorage.clear()
    props.history.push(`/login`);
  };

  const navigateToCreateContact = () => {
    props.history.push(`/contacts/create`);
  };

  const navigateToLists = () => {
    props.history.push(`/contacts`);
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="success">
        <Toolbar>
          <Typography onClick={navigateToLists} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Kontactly
          </Typography>
          <Button onClick={navigateToCreateContact} color="inherit">Create Contact</Button>
          <Button onClick={navigateToLists} color="inherit">List</Button>
          <Button onClick={navigateToLogin} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
};

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className="main-layout">
      <Topbar history={children.props.history} />
      <main>
        {children}
      </main>
      <Box sx={{ backgroundColor: '#2E7D32', bottom: 0, width: '100%', display: 'grid', placeItems: 'center', color: "white" }}>
      <Typography variant="body1">
        &copy;{' '}
        Kontactly 2024
      </Typography>

      </Box>
    </div>
  );
};

export default MainLayout;
