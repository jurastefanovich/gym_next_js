"use client";

import React, { Fragment, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Location from "../components/Location";
import { usePost } from "../hooks/usePost";
import { ContactResponse, Message } from "../_features/utils/Interfaces";
import { isLoggedIn } from "../_features/utils/LocalStorageHelpers";

// Styles using makeStyles (optional)
const useStyles = makeStyles({
  section: {
    marginBottom: "2rem",
    padding: "2rem",
    borderRadius: "8px",
  },
  sectionTitle: {
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  form: {
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },
  inputField: {
    marginBottom: "1rem",
  },
  submitButton: {
    marginTop: "1rem",
    padding: "10px 20px",
    fontWeight: "bold",
  },
  contactInfo: {
    marginTop: "2rem",
    textAlign: "center",
  },
  mapContainer: {
    marginTop: "2rem",
    width: "100%",
    height: "400px",
    backgroundColor: "#e0e0e0",
  },
});

const page = () => {
  const loggedIn = isLoggedIn();
  const classes = useStyles();
  const [name, setName] = useState(loggedIn ? "puno ime korisnika" : "");
  const [email, setEmail] = useState(loggedIn ? "postojeci email" : "");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const post = usePost<ContactResponse>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {};
    post.post("send_contact_api_path", body);

    // Simulate form submission
    setTimeout(() => {
      alert("Your message has been sent!");
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    }, 1000);
  };

  return (
    <Fragment>
      <Box sx={{ margin: "auto", padding: 5 }}>
        {/* Contact Form Section */}
        <Box className={classes.section}>
          <Typography
            variant="h4"
            align="center"
            className={classes.sectionTitle}
          >
            Contact Us
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {!loggedIn ? (
              <>
                <TextField
                  label="Your Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={classes.inputField}
                  required
                />
                <TextField
                  label="Your Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.inputField}
                  required
                />
              </>
            ) : null}

            <FormControl variant="outlined" className={classes.inputField}>
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label="Subject"
              >
                <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                <MenuItem value="Membership">Membership</MenuItem>
                <MenuItem value="Personal Training">Personal Training</MenuItem>
                <MenuItem value="Classes">Classes</MenuItem>
              </Select>
            </FormControl>
            <TextField
              multiline
              minRows={4}
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={classes.inputField}
              required
            />
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={post.loading}
              className={classes.submitButton}
            >
              {post.loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Fragment>
  );
};

export default page;
