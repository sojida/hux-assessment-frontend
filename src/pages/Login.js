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
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Login } from "../apis/Auth";
import { LoadingButton } from "@mui/lab";

const LoginPage = (props) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await Login(credentials);

    if (res.success) {
      localStorage.setItem("token", res.data.token);
      props.history.push("/contacts");
    } else {
      toast.error(res.message);
      setLoading(false);
    }
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
                <LoadingButton
                  loading={loading}
                  onClick={handleSubmit}
                  color="success"
                  variant="outlined"
                >
                  Login
                </LoadingButton>
                <Link to="/signup">Don't have an account yet?</Link>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
