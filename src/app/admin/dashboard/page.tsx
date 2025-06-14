"use client"
import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Types
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "trainer" | "member";
  joinDate: string;
  status: "active" | "suspended";
  avatar?: string;
};

type Trainer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  bio: string;
  activeSessions: number;
  avatar?: string;
};

type Session = {
  id: string;
  name: string;
  trainer: string;
  time: string;
  registeredUsers: number;
  capacity: number;
};

type GymInfo = {
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  workingHours: {
    day: string;
    openingTime: string;
    closingTime: string;
    isClosed: boolean;
  }[];
};

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  textAlign: "center",
}));

const DashboardPage: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState(0);
  const [gymInfo, setGymInfo] = useState<GymInfo>({
    name: "Peak Performance Gym",
    location: "123 Fitness Ave, Health City, HC 12345",
    contactEmail: "contact@peakperformance.com",
    contactPhone: "(555) 123-4567",
    workingHours: [
      {
        day: "Monday",
        openingTime: "06:00",
        closingTime: "22:00",
        isClosed: false,
      },
      {
        day: "Tuesday",
        openingTime: "06:00",
        closingTime: "22:00",
        isClosed: false,
      },
      {
        day: "Wednesday",
        openingTime: "06:00",
        closingTime: "22:00",
        isClosed: false,
      },
      {
        day: "Thursday",
        openingTime: "06:00",
        closingTime: "22:00",
        isClosed: false,
      },
      {
        day: "Friday",
        openingTime: "06:00",
        closingTime: "21:00",
        isClosed: false,
      },
      {
        day: "Saturday",
        openingTime: "08:00",
        closingTime: "20:00",
        isClosed: false,
      },
      {
        day: "Sunday",
        openingTime: "08:00",
        closingTime: "18:00",
        isClosed: false,
      },
    ],
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "member",
      joinDate: "2023-01-15",
      status: "active",
      avatar: "/avatars/1.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "member",
      joinDate: "2023-02-20",
      status: "active",
      avatar: "/avatars/2.jpg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "trainer",
      joinDate: "2022-11-05",
      status: "active",
      avatar: "/avatars/3.jpg",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "admin",
      joinDate: "2022-09-10",
      status: "active",
      avatar: "/avatars/4.jpg",
    },
  ]);

  const [trainers, setTrainers] = useState<Trainer[]>([
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "(555) 987-6543",
      specializations: ["Weight Training", "HIIT"],
      bio: "Certified personal trainer with 5 years experience",
      activeSessions: 3,
      avatar: "/avatars/3.jpg",
    },
    {
      id: "5",
      name: "Emily Chen",
      email: "emily@example.com",
      phone: "(555) 456-7890",
      specializations: ["Yoga", "Pilates"],
      bio: "Yoga instructor specializing in vinyasa flow",
      activeSessions: 5,
      avatar: "/avatars/5.jpg",
    },
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      name: "Morning HIIT",
      trainer: "Mike Johnson",
      time: "2023-06-15T07:00:00",
      registeredUsers: 8,
      capacity: 12,
    },
    {
      id: "2",
      name: "Yoga Flow",
      trainer: "Emily Chen",
      time: "2023-06-15T09:00:00",
      registeredUsers: 10,
      capacity: 15,
    },
  ]);

  const [newTrainer, setNewTrainer] = useState<
    Omit<Trainer, "id" | "activeSessions">
  >({
    name: "",
    email: "",
    phone: "",
    specializations: [],
    bio: "",
  });

  // Handlers
  const handleGymInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGymInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkingHoursChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setGymInfo((prev) => ({
      ...prev,
      workingHours: prev.workingHours.map((wh) =>
        wh.day === day ? { ...wh, [field]: value } : wh
      ),
    }));
  };

  const addTrainer = () => {
    const trainer: Trainer = {
      ...newTrainer,
      id: `${trainers.length + 1}`,
      activeSessions: 0,
      avatar: `/avatars/default.jpg`,
    };
    setTrainers([...trainers, trainer]);
    setNewTrainer({
      name: "",
      email: "",
      phone: "",
      specializations: [],
      bio: "",
    });
  };

  // Mock chart data (in a real app, you'd use a charting library)
  const membershipData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [120, 135, 150, 165, 180, 210],
  };

  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [45, 52, 60, 55, 48, 65, 40],
  };

  const trainerPopularityData = trainers.map((t) => ({
    name: t.name,
    value: t.activeSessions,
  }));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Paper sx={{ width: 240, p: 2, minHeight: "100vh" }}>
        <Typography variant="h6" sx={{ p: 2, fontWeight: "bold" }}>
          Gym Admin
        </Typography>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Dashboard" icon={<BarChartIcon />} />
          <Tab label="Gym Info" icon={<LocationIcon />} />
          <Tab label="Members" icon={<PeopleIcon />} />
          <Tab label="Trainers" icon={<FitnessCenterIcon />} />
          <Tab label="Sessions" icon={<ScheduleIcon />} />
          <Tab label="Statistics" icon={<PieChartIcon />} />
        </Tabs>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {activeTab === 0 && (
          <>
            <Typography variant="h4" gutterBottom>
              Dashboard Overview
            </Typography>

            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <Typography color="textSecondary" gutterBottom>
                    Total Active Members
                  </Typography>
                  <Typography variant="h4">210</Typography>
                  <Typography color="success.main">
                    +15% from last month
                  </Typography>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <Typography color="textSecondary" gutterBottom>
                    Active Sessions Today
                  </Typography>
                  <Typography variant="h4">8</Typography>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <Typography color="textSecondary" gutterBottom>
                    New Members This Month
                  </Typography>
                  <Typography variant="h4">30</Typography>
                </StyledCard>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StyledCard>
                  <Typography color="textSecondary" gutterBottom>
                    Average Session Attendance
                  </Typography>
                  <Typography variant="h4">52%</Typography>
                </StyledCard>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Membership Growth
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LineChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Weekly Attendance
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BarChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
            </Grid>
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="h4" gutterBottom>
              Gym Information
            </Typography>

            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                General Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Gym Name"
                    name="name"
                    value={gymInfo.name}
                    onChange={handleGymInfoChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={gymInfo.location}
                    onChange={handleGymInfoChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    value={gymInfo.contactEmail}
                    onChange={handleGymInfoChange}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    name="contactPhone"
                    value={gymInfo.contactPhone}
                    onChange={handleGymInfoChange}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ mr: 1, color: "action.active" }} />
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </StyledPaper>

            <StyledPaper>
              <Typography variant="h6" gutterBottom>
                Working Hours
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Opening Time</TableCell>
                      <TableCell>Closing Time</TableCell>
                      <TableCell>Closed</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gymInfo.workingHours.map((day) => (
                      <TableRow key={day.day}>
                        <TableCell>{day.day}</TableCell>
                        <TableCell>
                          <TextField
                            type="time"
                            value={day.openingTime}
                            onChange={(e) =>
                              handleWorkingHoursChange(
                                day.day,
                                "openingTime",
                                e.target.value
                              )
                            }
                            disabled={day.isClosed}
                            sx={{ width: 120 }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="time"
                            value={day.closingTime}
                            onChange={(e) =>
                              handleWorkingHoursChange(
                                day.day,
                                "closingTime",
                                e.target.value
                              )
                            }
                            disabled={day.isClosed}
                            sx={{ width: 120 }}
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={day.isClosed}
                            onChange={(e) =>
                              handleWorkingHoursChange(
                                day.day,
                                "isClosed",
                                e.target.checked
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained">Save Changes</Button>
              </Box>
            </StyledPaper>
          </>
        )}

        {activeTab === 2 && (
          <>
            <Typography variant="h4" gutterBottom>
              Member Management
            </Typography>

            <StyledPaper>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <TextField
                  label="Search members"
                  variant="outlined"
                  size="small"
                  sx={{ width: 300 }}
                />
                <FormControl sx={{ minWidth: 150 }} size="small">
                  <InputLabel>Role</InputLabel>
                  <Select label="Role" defaultValue="all">
                    <MenuItem value="all">All Roles</MenuItem>
                    <MenuItem value="admin">Admins</MenuItem>
                    <MenuItem value="trainer">Trainers</MenuItem>
                    <MenuItem value="member">Members</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Member</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Join Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={user.avatar} sx={{ mr: 2 }} />
                            {user.name}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.role}
                            size="small"
                            color={
                              user.role === "admin"
                                ? "primary"
                                : user.role === "trainer"
                                ? "secondary"
                                : "default"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(user.joinDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={user.status}
                            size="small"
                            color={
                              user.status === "active" ? "success" : "error"
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="info">
                            <VisibilityIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </>
        )}

        {activeTab === 3 && (
          <>
            <Typography variant="h4" gutterBottom>
              Trainer Management
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Add New Trainer
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        value={newTrainer.name}
                        onChange={(e) =>
                          setNewTrainer({ ...newTrainer, name: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        value={newTrainer.email}
                        onChange={(e) =>
                          setNewTrainer({
                            ...newTrainer,
                            email: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        value={newTrainer.phone}
                        onChange={(e) =>
                          setNewTrainer({
                            ...newTrainer,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Specializations (comma separated)"
                        value={newTrainer.specializations.join(", ")}
                        onChange={(e) =>
                          setNewTrainer({
                            ...newTrainer,
                            specializations: e.target.value
                              .split(", ")
                              .filter((s) => s),
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Bio"
                        multiline
                        rows={4}
                        value={newTrainer.bio}
                        onChange={(e) =>
                          setNewTrainer({ ...newTrainer, bio: e.target.value })
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={addTrainer}
                      >
                        Add Trainer
                      </Button>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Trainer List
                  </Typography>
                  <List>
                    {trainers.map((trainer) => (
                      <ListItem
                        key={trainer.id}
                        secondaryAction={
                          <>
                            <IconButton edge="end" color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" color="info">
                              <VisibilityIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar src={trainer.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={trainer.name}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                display="block"
                              >
                                {trainer.specializations.join(", ")}
                              </Typography>
                              <Typography component="span" variant="body2">
                                {trainer.activeSessions} active sessions
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </StyledPaper>
              </Grid>
            </Grid>
          </>
        )}

        {activeTab === 4 && (
          <>
            <Typography variant="h4" gutterBottom>
              Session Management
            </Typography>

            <StyledPaper>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Upcoming Sessions</Typography>
                <TextField type="date" size="small" sx={{ width: 200 }} />
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Session Name</TableCell>
                      <TableCell>Trainer</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Registered</TableCell>
                      <TableCell>Capacity</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.name}</TableCell>
                        <TableCell>{session.trainer}</TableCell>
                        <TableCell>
                          {new Date(session.time).toLocaleString()}
                        </TableCell>
                        <TableCell>{session.registeredUsers}</TableCell>
                        <TableCell>{session.capacity}</TableCell>
                        <TableCell>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </StyledPaper>
          </>
        )}

        {activeTab === 5 && (
          <>
            <Typography variant="h4" gutterBottom>
              Statistics & Reports
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Membership Growth
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LineChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={6}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Weekly Attendance
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BarChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Trainer Popularity
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PieChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Peak Hours
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BarChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
              <Grid item xs={12} md={4}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Member Retention
                  </Typography>
                  <Box
                    sx={{
                      height: 300,
                      bgcolor: "action.hover",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LineChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
                    <Typography>Chart would display here</Typography>
                  </Box>
                </StyledPaper>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DashboardPage;
