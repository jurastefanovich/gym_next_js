"use client";

import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Popover,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { removeToken } from "../utils/LocalStorageHelpers";

const AvatarMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push("/profile");
    handleClose();
  };

  const handleLogout = () => {
    removeToken();
    router.push("/");
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} sx={{ p: 0 }}>
        <Avatar sx={{ bgcolor: "primary.main", color: "white" }}>JŠ</Avatar>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 180,
            borderRadius: 2,
            overflow: "visible",
            boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
          <Typography variant="subtitle2">John Šmith</Typography>
          <Typography variant="body2" color="text.secondary">
            john@example.com
          </Typography>
        </Box>

        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Popover>
    </>
  );
};

export default AvatarMenu;
