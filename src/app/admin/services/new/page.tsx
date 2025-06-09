"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { usePostAuth } from "@/app/hooks/usePost";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { ArrowBack } from "@mui/icons-material";

const AddServicePage = () => {
  const router = useRouter();
  const post = usePostAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    durationSeconds: "",
    maxUsersPerGroupSession: "",
    individual: false,
    trainerRequired: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((f) => ({ ...f, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post.post(ServicesApi.POST_NEW, {
        title: form.title,
        description: form.description,
        durationSeconds: Number(form.durationSeconds),
        maxUsersPerGroupSession: Number(form.maxUsersPerGroupSession),
        individual: form.individual,
        trainerRequired: form.trainerRequired,
      });
    } catch (err) {
      console.error("Failed to update service", err);
    }
  };

  return (
    <BoxNoMargin>
      <Container>
        <Typography variant="h4" gutterBottom>
          Add New Service
        </Typography>

        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  minRows={3}
                  value={form.description}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Duration (seconds)"
                  name="durationSeconds"
                  type="number"
                  fullWidth
                  value={form.durationSeconds}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Max Users per Group */}
              <Grid item xs={6}>
                <TextField
                  label="Max Users per Group"
                  name="maxUsersPerGroupSession"
                  type="number"
                  fullWidth
                  value={form.maxUsersPerGroupSession}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Checkboxes */}
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.individual}
                      onChange={handleCheckboxChange}
                      name="individual"
                    />
                  }
                  label="Is Individual Session"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.trainerRequired}
                      onChange={handleCheckboxChange}
                      name="trainerRequired"
                    />
                  }
                  label="Is Trainer Required"
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                startIcon={<ArrowBack />}
                variant="outlined"
                onClick={() => router.back()}
              >
                Back
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </BoxNoMargin>
  );
};

export default AddServicePage;
