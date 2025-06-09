"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useGet } from "@/app/hooks/useGet";
import { usePostAuth } from "@/app/hooks/usePost";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import { ServiceCRUD, ServiceDetail } from "@/app/_features/utils/Interfaces";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { ConfirmationDialog } from "@/app/user_appointments/[userAppointmentId]/page";
import { ArrowBack } from "@mui/icons-material";

const EditServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const handleDelete = () => {
    // call delete endpoint…
    closeDeleteDialog();
    router.push("/admin/services");
  };

  const {
    data: service,
    loading,
    error,
  } = useGet<ServiceCRUD>(ServicesApi.GET_BY_ID + serviceId);
  const post = usePostAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    maxUsersPerGroupSession: "",
    trainerRequired: false,
    individual: false,
  });

  // Populate form when service loads
  useEffect(() => {
    if (service) {
      setForm({
        title: service.title,
        description: service.description,
        duration: String(service.duration),
        maxUsersPerGroupSession: String(service.maxUsersPerGroupSession),
        trainerRequired: service.needsTrainer,
        individual: service.individual,
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await post.post(ServicesApi.UPDATE_BY_ID + serviceId, {
        title: form.title,
        description: form.description,
        duration: Number(form.duration),
        maxUsersPerGroupSession: Number(form.maxUsersPerGroupSession),
      });
      router.push("/admin/services");
    } catch (err) {
      console.error("Failed to update service", err);
    }
  };

  if (loading) return <Typography sx={{ p: 4 }}>Loading…</Typography>;
  if (error || !service)
    return (
      <Typography sx={{ p: 4 }} color="error">
        Could not load service.
      </Typography>
    );

  return (
    <BoxNoMargin>
      <Container>
        <Typography variant="h4" gutterBottom>
          Edit Service
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

              {/* Duration (seconds) */}
              <Grid item xs={6}>
                <TextField
                  label="Duration (seconds)"
                  name="duration"
                  type="number"
                  fullWidth
                  value={form.duration}
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
                      // onChange={handleCheckboxChange}
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
                      // onChange={handleCheckboxChange}
                      name="trainerRequired"
                    />
                  }
                  label="Is Trainer Required"
                />
              </Grid>
            </Grid>

            <ConfirmationDialog
              open={deleteDialogOpen}
              title="Delete Service"
              message="Are you sure you want to permanently delete this service? This action cannot be undone."
              onConfirm={handleDelete}
              onCancel={closeDeleteDialog}
              confirmText="Yes, Delete"
              cancelText="Cancel"
              severity="error"
            />

            <Box mt={4}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                {/* Delete on the left, styled as dangerous */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={openDeleteDialog}
                >
                  Delete
                </Button>

                {/* Back + Save on the right */}
                <Stack direction="row" spacing={2}>
                  <Button
                    startIcon={<ArrowBack />}
                    variant="outlined"
                    onClick={() => router.back()}
                  >
                    Back
                  </Button>
                  <Button variant="contained" type="submit">
                    Save Changes
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Paper>
      </Container>
    </BoxNoMargin>
  );
};

export default EditServicePage;
