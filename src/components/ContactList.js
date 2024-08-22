import * as React from "react";
import ImageIcon from "@mui/icons-material/Image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { List, ListItemText, ListItemAvatar, Avatar, Stack, Pagination, Grid, ListItemButton, Box, Button, Modal, Typography } from "@mui/material";



const DeleteModal = ({ contact, open, handleClose, handleYes }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
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
      <Button onClick={handleClose} variant="outlined">No</Button>
      <Button onClick={handleYes} color="error">Yes</Button>
    </Box>
  </Modal>
  )
}

const PaginationRounded = () => {
  return (
    <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}

export default function ContactList({ contacts = [], history }) {
  const [selectedContact, setSelectedContact] = React.useState({});
  const [open, setOpen] = React.useState(false)



  const navigateToContact = (contactId) => {
    history.push(`/contacts/${contactId}/edit`);
  };

  const navigateToViwContact = (contactId) => {
    history.push(`/contacts/${contactId}/view`);
  };


  const openModal = (contact) => {
    setSelectedContact(contact)
    setOpen(true)
  }


  return (
    <List sx={{ width: "100%", maxWidth: 400, minWidth: 300, margin: "auto" }}>
      <DeleteModal open={open} handleClose={() => setOpen(false)} contact={selectedContact} handleYes={() => setOpen(false)}/>
      {contacts.map((contact) => {
        return (
          <List
            key={contact._id}
            style={{
              margin: "10px",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
              borderRadius: "5px",
            }}
          >
            <Grid>
              <ListItemButton onClick={() => navigateToViwContact(contact._id)}>
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
                padding: '5px'
              }}
            >
              <Button onClick={() => navigateToContact(contact._id)}>
                <EditIcon />
              </Button>
              <Button>
                <DeleteIcon onClick={() => openModal(contact)} />
              </Button>
            </Box>
          </List>
        );
      })}
      <PaginationRounded />
    </List>
  );
}
