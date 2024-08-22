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
import contacts from "../mocks/contacts";
import { useParams } from 'react-router-dom'

const Contact = ({ history }) => {
    const [view, setView] = React.useState('create')   
    const [contact, setContact] = React.useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        countryCode: ''
    });

    const { contactId } = useParams();
    React.useEffect(() => {
        if (history && history.location.pathname.includes('edit')) {
            setView('edit')
            const _contact = contacts.find((c) => c._id === contactId)
            if (_contact) setContact(_contact);
        }
    }, [])
    const navigateToSignup = () => {
        history.push(`/contacts`);
      };
    



    const handleChange = (e) => {
        setContact({...contact, [e.target.name] : e.target.value });
      };
    
      const handleSubmit = () => {
        navigateToSignup();
      };
    
    return (
        <div className="">
        <Grid>
          <Grid>
            <Card>
              <form>
                <CardHeader title={`${view === 'create' ? 'Create' : 'Edit'} Contact`} />
                <Divider />
                <CardContent>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={contact.firstName}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Last name"
                    name="lastName"
                    style={{ marginTop: "1rem" }}
                    onChange={handleChange}
                    value={contact.lastName}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Country Code"
                    name="countryCode"
                    style={{ marginTop: "1rem" }}
                    onChange={handleChange}
                    value={contact.countryCode}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    style={{ marginTop: "1rem" }}
                    onChange={handleChange}
                    value={contact.phoneNumber}
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
                    {view === 'create' ? 'Create' : 'Edit'}
                  </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
}

export default Contact;
