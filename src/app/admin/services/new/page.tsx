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
  Card,
  CardContent,
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { usePostAuth } from "@/app/hooks/usePost";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { ArrowBack } from "@mui/icons-material";
import { ADMIN_ROUTES } from "@/app/_features/enums/Routes";
import { useGet } from "@/app/hooks/useGet";

const AddServicePage = () => {
  const router = useRouter();
  const post = usePostAuth();
  const get = useGet<string>(ServicesApi.GET_EXERCISES);
  const availableExercises = get?.data ?? [];
  const [form, setForm] = useState({
    title: "",
    description: "",
    durationSeconds: "",
    maxUsersPerGroupSession: "",
    individual: false,
    trainerRequired: false,
    exercises: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
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
        exercises: form.exercises,
      });

      router.push(ADMIN_ROUTES.SERVICES);
    } catch (error) {
      console.error("Failed to create service", error);
    }
  };

  return (
    <BoxNoMargin sx={{ bgcolor: "background.default", pt: 8, pb: 12 }}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container sx={{ mb: 6 }}>
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

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Stack>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Service Details
                </Typography>
                <Divider />

                <Grid container mt={2} spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Title"
                      name="title"
                      fullWidth
                      required
                      value={form.title}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>

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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Duration (seconds)"
                      name="durationSeconds"
                      type="number"
                      fullWidth
                      required
                      value={form.durationSeconds}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={form.individual}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Max Users per Group"
                      name="maxUsersPerGroupSession"
                      type="number"
                      fullWidth
                      required
                      value={form.maxUsersPerGroupSession}
                      onChange={handleChange}
                      variant="outlined"
                      disabled={form.individual}
                    />
                  </Grid>

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

                  <Grid item xs={12}>
                    {get.loading ? (
                      <LinearProgress />
                    ) : (
                      <Autocomplete
                        multiple
                        options={availableExercises}
                        value={form.exercises}
                        onChange={(_, newValue) =>
                          setForm((prev) => ({ ...prev, exercises: newValue }))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Select Exercises"
                            placeholder="Exercises"
                          />
                        )}
                      />
                    )}
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <div />
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
