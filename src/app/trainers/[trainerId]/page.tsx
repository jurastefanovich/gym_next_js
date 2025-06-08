"use client";
import { TrainerApi } from "@/app/_features/enums/ApiPaths";
import { TrainerIntroduction } from "@/app/_features/utils/Interfaces";
import { getAccessToken } from "@/app/_features/utils/LocalStorageHelpers";
import { useGet } from "@/app/hooks/useGet";
import { Email, FitnessCenter, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 250,
  height: 250,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    width: 180,
    height: 180,
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.dark,
}));

export default function TrainerPage() {
  const theme = useTheme();
  const { trainerId } = useParams();
  const { data: trainerData } = useGet<TrainerIntroduction>(
    TrainerApi.INTRO + trainerId
  );
  const isLoggedIn = getAccessToken();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setOpen(false);
    setFormData({ title: "", message: "", email: "" });
  };

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.light,
          0.05
        )} 0%, ${theme.palette.background.default} 100%)`,
        py: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Card
          sx={{
            borderRadius: 4,
            bgcolor: "transparent",
            boxShadow: "0",
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* Left Column - Trainer Image & Basic Info */}
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                color: "white",
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StyledAvatar
                src="/trainer2.jpg"
                alt={`${trainerData?.firstName} ${trainerData?.lastName}`}
              />
              <Typography
                variant="h4"
                component="h1"
                color="primary"
                sx={{ mt: 3, fontWeight: 700 }}
              >
                {trainerData?.firstName} {trainerData?.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ opacity: 0.9, mb: 2 }}
                color="primary"
              >
                Certified Personal Trainer
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Email />}
                  onClick={() => setOpen(true)}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Contact
                </Button>
              </Stack>
            </Grid>

            {/* Right Column - Trainer Details */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  About {trainerData?.firstName}
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ mb: 3, lineHeight: 1.8 }}
                >
                  {trainerData?.description ||
                    "Passionate fitness professional with years of experience helping clients achieve their health and wellness goals."}
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  Specializations
                </Typography>
                <Box sx={{ mb: 4 }}>
                  {trainerData?.specialization?.map((skill) => (
                    <SkillChip
                      key={skill}
                      label={skill}
                      icon={<FitnessCenter fontSize="small" />}
                    />
                  ))}
                </Box>

                <Divider sx={{ my: 4 }} />

                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  Contact Information
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Email:</strong> {trainerData?.email}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Phone:</strong> (555) 123-4567
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>

      {/* Contact Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            width: "100%",
            maxWidth: "500px",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.main",
            color: "white",
            fontWeight: 600,
            py: 2,
          }}
        >
          Contact {trainerData?.firstName}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ py: 3 }}>
            {isLoggedIn ? null : (
              <TextField
                fullWidth
                margin="normal"
                label="Subject"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Subject"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Your Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                color: "text.secondary",
                borderRadius: 1,
                px: 3,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<Send />}
              sx={{
                borderRadius: 1,
                px: 3,
                fontWeight: 600,
              }}
            >
              Send Message
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
