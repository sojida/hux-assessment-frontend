import React from "react";
import {
  Grid,
  Card,
  CardHeader,
  Divider,
  CardContent,
  TextField,
  CardActions,
} from "@mui/material";
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Signup } from '../apis/Auth'
import { LoadingButton } from "@mui/lab";

const SignupPage = (props) => {

  const [loading, setLoading] = React.useState(false)
  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true)
    const res = await Signup(credentials)
    
    if (res.success) {
      localStorage.setItem('token', res.data.token)
      props.history.push('/contacts')
    } else {
      toast.error(res.message)
      setLoading(false)
    }
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
                <LoadingButton
                  loading={loading}
                  onClick={handleSubmit}
                  color="success"
                  variant="outlined"
                >
                  Signup
                </LoadingButton>
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

export default SignupPage;
