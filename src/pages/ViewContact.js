import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { useParams } from 'react-router-dom'
import contacts from "../mocks/contacts";


export default function ViewContact({ history}) {
    const { contactId } = useParams();
    const [contact, setContact] = React.useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        countryCode: ''
    });
    React.useEffect(() => {
            const _contact = contacts.find((c) => c._id === contactId)
            if (_contact) setContact(_contact)
    }, [])
  return (
    <Grid style={{ display: 'grid', placeItems: 'center'}}>
    <Card sx={{ maxWidth: 345, marginTop: '20px', boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}}>
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
      </CardActionArea>
    </Card>
    </Grid>
  );
}