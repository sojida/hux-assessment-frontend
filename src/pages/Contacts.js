import { Grid, TextField, Button, Card } from "@mui/material";
import ContactList from "../components/ContactList";
import React from "react";
import contacts from "../mocks/contacts";

const Contacts = (props) => {
    const [search, setSearch] = React.useState('')
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <Grid>
            <Grid>
                <form style={{ display: 'flex', justifyContent: 'center', maxWidth: 400, margin: 'auto'}}>
                <TextField
                  fullWidth
                  label="Search"
                  placeholder="Search by name or phone number"
                  name="search"
                  style={{ marginTop: "1rem" }}
                  onChange={handleChange}
                  value={search}
                  variant="outlined"
                />
                </form>
            </Grid>
            <Grid>
                <ContactList contacts={contacts} history={props.history} />
            </Grid>
        </Grid>
    )
}

export default Contacts;
