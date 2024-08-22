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
import { useParams } from "react-router-dom";
import { CreateContact, GetContact, UpdateContact } from '../apis/Contacts'
import toast from 'react-hot-toast';
import { LoadingButton } from "@mui/lab";

const Contact = ({ history }) => {
  const [loading, setLoading] = React.useState(false);
  const [view, setView] = React.useState("create");
  const [contact, setContact] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
  });

  const fetchContact = async (contactId) => {
    setLoading(true)
    const response = await GetContact({ contactId })
    if (response.success) setContact(response.data.contact);
    setLoading(false)
  }

  const { contactId } = useParams();
  React.useEffect(() => {
    if (history && history.location.pathname.includes("edit")) {
      setView("edit");
      fetchContact(contactId)
    }
  }, []);


  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true)
    let response;
    if (view === 'create') {
      response = await CreateContact(contact)
    } else {
      response = await UpdateContact({...contact, contactId: contact._id})
    }

    if (response.success) {
      history.push(`/contacts`);
      toast.success(response.message)
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  };

  return (
    <div className="">
      <Grid>
        <Grid>
          <Card>
            <form>
              <CardHeader
                title={`${view === "create" ? "Create" : "Edit"} Contact`}
              />
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
                <LoadingButton
                  loading={loading}
                  onClick={handleSubmit}
                  color="success"
                  variant="outlined"
                >
                  {view === "create" ? "Create" : "Edit"}
                </LoadingButton>
              </CardActions>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
