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

const Login = (props) => {
  const navigateToSignup = () => {
    props.history.push(`/signup`);
  };

  const [credentials, setCredentials] = React.useState({
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
              <CardHeader subheader="Welcome back!" title="Login" />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
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
                  Login
                </Button>
              <Link to="/signup" >
                Don't have an account yet?
              </Link>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
