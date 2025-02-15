"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Grid,
  Container,
} from "@mui/material";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { Background } from "@/app/_features/enums/Colors";
import dummyServices from "@/app/_features/dummyData/services.json"
// Define the structure for services
interface Service {
  id: string;
  title: string;
}

interface Props {
  params: {
    serviceId: string;
  };
}

// Mock services
const services: Service[] = dummyServices;

// Define the structure for form data
interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  serviceId: string;
}

const BookServicePage = ({ params }: Props) => {
  // Define the state with the FormData type
  const { serviceId } = params; // Extract `serviceId` from the dynamic route
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    serviceId: "",
  });

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here (e.g., API call)
  };

  return (
    <BoxNoMargin
      sx={{ height: "100vh", bgcolor: Background.LIGHT, pt: 10, pb: 10 }}
    >
      <Container>
        <Typography variant="h5" fontWeight={"bold"} mb={3}>
          Book an Appointment
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Phone Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="tel"
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {/* Date Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Preferred Date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            {/* Time Field */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Preferred Time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            {/* Service Selection */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Select Service"
                name="serviceId"
                value={serviceId}
                onChange={handleInputChange}
                required
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit Appointment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </BoxNoMargin>
  );
};
export default BookServicePage;
