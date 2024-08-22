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
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
    <div>
      <Topbar history={children.props.history} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
