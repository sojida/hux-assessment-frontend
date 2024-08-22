import * as React from "react";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from "react-hot-toast";
import { DeleteContact } from "../apis/Contacts";
import {
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  Pagination,
  Grid,
  ListItemButton,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const DeleteModal = ({ contact, open, handleClose, handleYes, loading }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 id="parent-modal-title">Delete Contact</h2>
        <Typography id="parent-modal-description">
          Are you sure you want to delete {contact.firstName} from your contact?
        </Typography>
        <Button onClick={handleClose} variant="outlined">
          No
        </Button>
        <LoadingButton loading={loading} onClick={handleYes} color="error">
          Yes
        </LoadingButton>
      </Box>
    </Modal>
  );
};

export default function ContactList({
  handlePageChange,
  metaData,
  contacts = [],
  history,
  fetchContacts,
}) {
  const [selectedContact, setSelectedContact] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigateToContact = (contactId) => {
    history.push(`/contacts/${contactId}/edit`);
  };

  const navigateToViwContact = (contactId) => {
    history.push(`/contacts/${contactId}/view`);
  };

  const navigateToCreateContact = () => {
    history.push(`/contacts/create`);
  };

  const openModal = (contact) => {
    setSelectedContact(contact);
    setOpen(true);
  };

  const copyContact = (contact) => {
    toast.success('contact copied!')
    navigator.clipboard.writeText(contact.phoneNumber)
  };

  const handleYes = async () => {
    setLoading(true);
    const response = await DeleteContact({ contactId: selectedContact._id });
    response.success
      ? toast.success(response.message)
      : toast.error(response.message);
    setOpen(false);
    setLoading(false);
    fetchContacts('', 1);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 400, minWidth: 300, margin: "auto" }}>
      <DeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        contact={selectedContact}
        handleYes={handleYes}
        loading={loading}
      />
      {contacts.length ? (
        contacts.map((contact) => {
          return (
            <List
              key={contact._id}
              style={{
                margin: "10px",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                borderRadius: "5px",
                backgroundColor: 'white'
              }}
            >
              <Grid>
                <ListItemButton
                  onClick={() => navigateToViwContact(contact._id)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${contact.firstName} ${contact.lastName}`}
                    secondary={`${contact.countryCode} ${contact.phoneNumber}`}
                  />
                </ListItemButton>
              </Grid>
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
                  <DeleteIcon onClick={() => openModal(contact)} />
                </Button>
              </Box>
            </List>
          );
        })
      ) : (
        <Box sx={{ display: "grid", placeItems: "center", margin: '10px' }}>
          <Typography align="center">No contacts</Typography>
          <Button onClick={navigateToCreateContact} variant="outlined" color="success">
            Create Contact
          </Button>
        </Box>
      )}
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Pagination
          count={metaData.totalPages}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </List>
  );
}
