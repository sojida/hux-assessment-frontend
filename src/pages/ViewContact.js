import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { GetContact, DeleteContact } from "../apis/Contacts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DeleteModal } from "../components/ContactList";
import toast from "react-hot-toast";

export default function ViewContact({ history }) {
  const { contactId } = useParams();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [contact, setContact] = React.useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
  });

  const fetchContact = async (contactId) => {
    setLoading(true);
    const response = await GetContact({ contactId });
    response.success ? setContact(response.data.contact) : setContact(null);
    setLoading(false);
  };

  const navigateToContact = (contactId) => {
    history.push(`/contacts/${contactId}/edit`);
  };

  const navigateToContactList = () => {
    history.push(`/contacts`);
  };

  const copyContact = (contact) => {
    toast.success('contact copied!')
    navigator.clipboard.writeText(contact.phoneNumber)
  };

  React.useEffect(() => {
    fetchContact(contactId);
  }, []);

  const handleYes = async () => {
    setLoading(true);
    const response = await DeleteContact({ contactId: contact._id });
    response.success
      ? toast.success(response.message)
      : toast.error(response.message);
    setOpen(false);
    setLoading(false);
    history.push(`/contacts`);
  };
  return (
    <Grid className="view-contacts" style={{ display: "grid", placeItems: "center" }}>
      {loading && <Typography align="center">Loading...</Typography>}
      {contact ? (
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
          }}
        >
          <DeleteModal
            open={open}
            handleClose={() => setOpen(false)}
            contact={contact}
            handleYes={handleYes}
            loading={loading}
          />
          <CardActionArea>
            <CardMedia
              component="img"
              height="250"
              image="https://res.cloudinary.com/dtblh1olg/image/upload/v1724273497/computer-icons-avatar-user-profile-contact-b2894e80d4aa23f91ef6d68376bff4b6_gbznor.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {contact.firstName} {contact.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {contact.countryCode} {contact.phoneNumber}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between",
                alignContent: "end",
                padding: "5px",
              }}
            >
              <Button onClick={() => copyContact(contact)}>
                  <ContentCopyIcon />
                </Button>
              <Button onClick={() => navigateToContact(contact._id)}>
                <EditIcon />
              </Button>
              <Button>
                <DeleteIcon onClick={() => setOpen(true)} />
              </Button>
            </Box>
          </CardActionArea>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', placeItems: 'center', marginTop: '50px'}}>
          <Typography variant="h4">Oops...Contact Not Found</Typography>
          <Button
            variant="outlined"
            color="success"
            onClick={navigateToContactList}
          >
            View Contact List
          </Button>
        </Box>
      )}
    </Grid>
  );
}
