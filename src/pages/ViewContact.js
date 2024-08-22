import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Box , Button} from "@mui/material";
import { useParams } from "react-router-dom";
import { GetContact, DeleteContact } from "../apis/Contacts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
    if (response.success) setContact(response.data.contact);
    setLoading(false);
  };

  const navigateToContact = (contactId) => {
    history.push(`/contacts/${contactId}/edit`);
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
    <Grid style={{ display: "grid", placeItems: "center" }}>
      <DeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        contact={contact}
        handleYes={handleYes}
        loading={loading}
      />
      <Card
        sx={{
          maxWidth: 345,
          marginTop: "20px",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      >
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
            <Button onClick={() => navigateToContact(contact._id)}>
              <EditIcon />
            </Button>
            <Button>
              <DeleteIcon onClick={() => setOpen(true)} />
            </Button>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
