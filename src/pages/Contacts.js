import { Grid, TextField, Typography } from "@mui/material";
import ContactList from "../components/ContactList";
import React from "react";
// import contacts from "../mocks/contacts";
import { GetContacts } from "../apis/Contacts";
import { useDebouncedCallback } from 'use-debounce';


const Contacts = (props) => {
  const [search, setSearch] = React.useState("");
  const [contacts, setContacts] = React.useState([]);
  const [metaData, setMetaData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const fetchContacts = async (search = "", page = 1 ) => {
    setLoading(true)
    const response = await GetContacts({ search, page });
    setContacts(response.data.contacts);
    setMetaData(response.data.meta);
    setLoading(false)
  };

  const handlePageChange = (e, page) => {
    setMetaData({ ...metaData, page})
    fetchContacts(search, page)
  }

  const debounce = useDebouncedCallback(
    async () => {
      await fetchContacts(search, 1);
    },
    1000,
    // The maximum time func is allowed to be delayed before it's invoked:
    { maxWait: 1500 }
  );

  const handleChange = (e) => {
    setLoading(true)
    const text = e.target.value;
    setSearch(text);
    const url = new URL(window.location.href);
    url.searchParams.set('search', text);
    window.history.pushState({}, '', url.toString());
    debounce()
  };

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const searchText = url.searchParams.get('search');
    if (searchText && searchText.length) {
        setSearch(searchText)
    }

    fetchContacts(searchText || '', 1);


  }, []);

  return (
    <Grid>
      <Grid>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            maxWidth: 400,
            margin: "auto",
          }}
        >
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
        {loading ? <Typography align="center">Loading...</Typography> : <ContactList
          contacts={contacts}
          history={props.history}
          fetchContacts={fetchContacts}
          metaData={metaData}
          handlePageChange={handlePageChange}
        />}
      </Grid>
    </Grid>
  );
};

export default Contacts;
