import React from "react";
import {
  Button,
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";
import { Link } from 'react-router-dom'

const Signup = (props) => {
  const navigateToSignup = () => {
    props.history.push(`/contacts`);
  };

  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value });
  };

  const handleSubmit = () => {
    navigateToSignup();
  };

  return (
    <div className="login-page">
      <Grid>
        <Grid>
          <Card>
            <form>
              <CardHeader subheader="Welcome!" title="Signup" />
              <Divider />
              <CardContent>
              <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  value={credentials.name}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  style={{ marginTop: "1rem" }}
                  onChange={handleChange}
                  value={credentials.email}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  style={{ marginTop: "1rem" }}
                  onChange={handleChange}
                  type="password"
                  value={credentials.password}
                  variant="outlined"
                />
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  onClick={handleSubmit}
                  color="success"
                  variant="outlined"
                >
                  Signup
                </Button>
              <Link to="/login" >
                Already have an account?
              </Link>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
