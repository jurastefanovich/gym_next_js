"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
  Chip,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useGet } from "@/app/hooks/useGet";
import { usePostAuth } from "@/app/hooks/usePost";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import { ServiceCRUD, ServiceDetail } from "@/app/_features/utils/Interfaces";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { ConfirmationDialog } from "@/app/user_appointments/[id]/page";
import { ArrowBack } from "@mui/icons-material";
import { usePut } from "@/app/hooks/usePut";
import { useDelete } from "@/app/hooks/useDelete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const EditServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const del = useDelete();
  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = async () => {
    await del.deleteRequest(ServicesApi.DELETE_BY_ID + serviceId);
    closeDeleteDialog();
    router.push("/admin/services");
  };

  const {
    data: service,
    loading,
    error,
  } = useGet<ServiceCRUD>(ServicesApi.GET_BY_ID + serviceId);
  const put = usePut();

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((f) => ({ ...f, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await put.put(ServicesApi.UPDATE_BY_ID + serviceId, {
        title: form.title,
        description: form.description,
        durationSeconds: Number(form.duration),
        individual: Boolean(form.individual),
        trainerRequired: Boolean(form.trainerRequired),
        maxUsersPerGroupSession: Number(form.maxUsersPerGroupSession),
      });
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
                  Edit Service
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
        <Card sx={{ mb: 6 }}>
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
                      name="duration"
                      type="number"
                      fullWidth
                      value={form.duration}
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
                      size="large"
                    >
                      Delete Service
                    </Button>

                    {/* Save on the right */}
                    <Button
                      variant="contained"
                      type="submit"
                      size="large"
                      sx={{ px: 4 }}
                    >
                      Save Changes
                    </Button>
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

export default EditServicePage;
