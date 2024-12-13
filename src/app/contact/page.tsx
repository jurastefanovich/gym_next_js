"use client";

import React, { useState } from "react";
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

// Styles using makeStyles (optional)
const useStyles = makeStyles({
  section: {
    marginBottom: "2rem",
    padding: "2rem",
    backgroundColor: "#f4f4f4",
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
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      alert("Your message has been sent!");
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    }, 2000);
  };

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 2 }}>
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
            disabled={loading}
            className={classes.submitButton}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Box>

      <Location />
    </Box>
  );
};

export default page;
