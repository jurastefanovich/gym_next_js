"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Stack,
  Divider,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { usePostAuth } from "@/app/hooks/usePost";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { ArrowBack } from "@mui/icons-material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
      router.push("/admin/services");
    } catch (err) {
      console.error("Failed to create service", err);
    }
  };

  return (
    <BoxNoMargin sx={{ bgcolor: "background.default", pt: 8, pb: 12 }}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Header Section */}
        <Grid container sx={{ mb: 6 }}>
          {/* Left Column - Service Info */}
          <Grid item xs={12} md={11}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <div>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.2,
                    color: "primary.main",
                  }}
                >
                  Add New Service
                </Typography>
              </div>
            </Stack>
          </Grid>

          {/* Right Column - Back Button */}
          <Grid item xs={12} md={1}>
            <Button
              startIcon={<ArrowBack />}
              variant="text"
              onClick={() => router.back()}
              size="large"
              sx={{ alignSelf: "flex-start" }}
            >
              Back
            </Button>
          </Grid>
        </Grid>

        {/* Form Section */}
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Service Details
                </Typography>
                <Divider />

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
                      variant="outlined"
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      label="Description"
                      name="description"
                      fullWidth
                      multiline
                      minRows={4}
                      value={form.description}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

                  {/* Duration (seconds) */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Duration (seconds)"
                      name="durationSeconds"
                      type="number"
                      fullWidth
                      value={form.durationSeconds}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  {/* Max Users per Group */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Max Users per Group"
                      name="maxUsersPerGroupSession"
                      type="number"
                      fullWidth
                      value={form.maxUsersPerGroupSession}
                      onChange={handleChange}
                      required
                      variant="outlined"
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
                          color="primary"
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
                          color="primary"
                        />
                      }
                      label="Is Trainer Required"
                    />
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <div></div> {/* Empty spacer for alignment */}
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        onClick={() => router.back()}
                        size="large"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        sx={{ px: 4 }}
                      >
                        Create Service
                      </Button>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
    </BoxNoMargin>
  );
};

export default AddServicePage;
