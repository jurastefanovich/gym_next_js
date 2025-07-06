import { UserApi } from "@/app/_features/enums/ApiPaths";
import { useAuth } from "@/app/context/AuthContext";
import { useGet } from "@/app/hooks/useGet";
import { Close, Edit, Email, Phone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function ProfileId() {
  const { id } = useParams();
  const auth = useGet(UserApi.GET_BY_ID + "/" + id);

  const user = auth?.data;

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
  });

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    setUser({ ...user, ...editForm });
    setOpenEditDialog(false);
  };

  const handleEditCancel = () => {
    setEditForm({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phoneNumber: user?.phoneNumber,
    });
    setOpenEditDialog(false);
  };

  const handleFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>
                {user?.firstName.charAt(0)}
                {user?.lastName.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography color="text.secondary">
                  @{user?.username}
                </Typography>
              </Box>
            </Stack>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              <Email fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              {user?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              <Phone fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
              {user?.phoneNumber}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Edit Profile</Typography>
            <IconButton onClick={handleEditCancel}>
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={editForm.firstName}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editForm.lastName}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editForm.email}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={handleFormChange}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
