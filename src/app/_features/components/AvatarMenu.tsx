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
  Divider,
  Badge,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation";
import { logout, removeToken } from "../utils/LocalStorageHelpers";
import { useGet } from "@/app/hooks/useGet";
import { ProfileResponse } from "../utils/Interfaces";
import { UserApi } from "../enums/ApiPaths";
import { Background } from "../enums/Colors";
import { useAuth } from "@/app/context/AuthContext";

const AvatarMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const get = useAuth();

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

  const handleSettings = () => {
    router.push("/settings");
    handleClose();
  };

  const handleLogout = () => {
    logout();
    router.push("/");
    handleClose();
  };

  if (get.loading) {
    return <CircularProgress sx={{ color: "white" }} size={"25px"} />;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          p: 0,
          "&:hover": {
            transform: "scale(1.1)",
            transition: "transform 0.2s ease-in-out",
          },
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 36,
            height: 36,
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {get.data?.initials || <PersonIcon fontSize="small" />}
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            overflow: "visible",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.12)",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1,
            bgcolor: "primary.main",
            color: "common.white",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            {get.data?.firstName} {get.data?.lastName}
          </Typography>
          <Typography variant="body2">{get.data?.email}</Typography>
        </Box>

        <Box sx={{ p: 1 }}>
          <MenuItem
            onClick={handleProfile}
            sx={{
              borderRadius: 1,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>

          <MenuItem
            onClick={handleSettings}
            sx={{
              borderRadius: 1,
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>

          <Divider sx={{ my: 0.5 }} />

          <MenuItem
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              "&:hover": {
                bgcolor: Background.PRIMARY,
                color: "white",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default AvatarMenu;
