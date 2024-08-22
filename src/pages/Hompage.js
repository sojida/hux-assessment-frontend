import { Button, Grid, Typography } from "@mui/material";

const Homepage = (props) => {
  const navigateToLogin = () => {
    props.history.push(`/login`);
  };

  return (
    <div className="homepage-container">
      <Grid>
        <Grid>
          <Typography align="center" variant="h1">
            Kontactly
          </Typography>
          <Typography align="center" variant="h6">
            Save a contact, keep in touch!
          </Typography>
          <Button onClick={navigateToLogin} fullWidth variant="contained" color="success">
            Get Started
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Homepage;
