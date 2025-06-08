"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Grid,
  Stack,
  Typography,
  Container,
  Button,
  Chip,
  Divider,
  Box,
} from "@mui/material";
import TrainerContainer from "./components/TrainerContainer";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { Background } from "@/app/_features/enums/Colors";
import { useGet } from "@/app/hooks/useGet";
import { ServiceDetail } from "@/app/_features/utils/Interfaces";
import { ServicesApi } from "@/app/_features/enums/ApiPaths";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ArrowBack } from "@mui/icons-material";
import ServiceMessage from "./components/ServiceMessage";
import { useState } from "react";
import BookingStepperDialog from "./components/BookingStepperDialog";
import { getAccessToken } from "@/app/_features/utils/LocalStorageHelpers";


export default function ServicePage() {
  const { serviceId } = useParams();
  const get = useGet<ServiceDetail>(ServicesApi.GET_BY_ID + serviceId);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const service = get.data;
  const isLoggedIn = getAccessToken();
  const route = useRouter();
  function handleNavigateToLogin() {
    route.push("/login");
  }
  return (
    <BoxNoMargin sx={{ bgcolor: Background.LIGHT, pt: 8, pb: 12 }}>
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
                  {service?.title}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={
                      service?.duration
                        ? `${Math.ceil(service.duration / 60)} min`
                        : "N/A"
                    }
                    variant="outlined"
                    color="primary"
                  />
                </Stack>

                {service && (
                  <ServiceMessage
                    individual={service.individual}
                    needsTrainer={service.needsTrainer}
                  />
                )}
              </div>
            </Stack>
          </Grid>

          {/* Right Column - Book Button (now moved below description) */}
          <Grid item xs={12} md={1}>
            {/* Back Button - Now positioned top-right */}
            <Button
              startIcon={<ArrowBack />}
              variant="text"
              href="/services"
              size="large"
              sx={{ alignSelf: "flex-start" }}
            >
              Back
            </Button>
          </Grid>
        </Grid>

        {/* Description Section */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Service Details
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {service?.description}
          </Typography>
        </Stack>

        <Stack spacing={4}>
          <Box>
            {isLoggedIn ? (
              <Button
                variant="contained"
                size="large"
                onClick={() => setBookingDialogOpen(true)}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  minWidth: 200,
                }}
              >
                Book Now
              </Button>
            ) : (
              <Button
                variant="contained"
                size="large"
                onClick={() => handleNavigateToLogin()}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: "1.1rem",
                  minWidth: 200,
                }}
              >
                Login to book service
              </Button>
            )}
          </Box>
          {service && (
            <BookingStepperDialog
              open={bookingDialogOpen}
              onClose={() => setBookingDialogOpen(false)}
              service={service}
              serviceId={Number(serviceId)}
            />
          )}
          {/* Trainer Section - Only show if needsTrainer is true */}
          {service?.needsTrainer && service?.trainer && (
            <Stack spacing={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "primary.main",
                }}
              >
                Meet Your Trainer
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container gap={2}>
                <Grid item xs={12} sm={6} md={4} key={service.trainer.id}>
                  <TrainerContainer
                    id={service.trainer.id}
                    lastName={service.trainer.lastName}
                    firstName={service.trainer.firstName}
                  />
                </Grid>
              </Grid>
            </Stack>
          )}
        </Stack>
      </Container>
    </BoxNoMargin>
  );
}
