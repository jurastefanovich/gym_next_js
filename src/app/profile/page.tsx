"use client";

import { 
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  LinearProgress,
  CircularProgress,
  MenuItem,
  Select,
  Chip
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TimelineIcon from '@mui/icons-material/Timeline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Mock data for exercises and progress
const exerciseOptions = [
  { id: 'all', name: 'All Exercises' },
  { id: 'squats', name: 'Squats' },
  { id: 'pushups', name: 'Pushups' },
  { id: 'pullups', name: 'Pullups' },
  { id: 'deadlifts', name: 'Deadlifts' },
  { id: 'running', name: 'Running' },
];

const progressData = {
  today: {
    exercises: 3,
    minutes: 45,
    progress: 60,
    goal: 5,
    sessions: {
      total: 3,
      byExercise: {
        squats: 2,
        pushups: 1,
        pullups: 0,
        deadlifts: 0,
        running: 1
      }
    }
  },
  week: {
    exercises: 12,
    minutes: 240,
    progress: 80,
    goal: 15,
    sessions: {
      total: 12,
      byExercise: {
        squats: 5,
        pushups: 3,
        pullups: 2,
        deadlifts: 1,
        running: 3
      }
    }
  },
  month: {
    exercises: 42,
    minutes: 1260,
    progress: 70,
    goal: 60,
    sessions: {
      total: 42,
      byExercise: {
        squats: 15,
        pushups: 12,
        pullups: 8,
        deadlifts: 5,
        running: 10
      }
    }
  },
  year: {
    exercises: 480,
    minutes: 14400,
    progress: 65,
    goal: 730,
    sessions: {
      total: 480,
      byExercise: {
        squats: 150,
        pushups: 120,
        pullups: 80,
        deadlifts: 50,
        running: 100
      }
    }
  }
};

export default function EditProfile() {
  const get = useAuth();
  const user = get.data;
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    avatar: null
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [selectedExercise, setSelectedExercise] = useState('all');
  const [showAllExercises, setShowAllExercises] = useState(false);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setFormData(prev => ({
      ...prev,
      avatar: file
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const toggleShowAllExercises = () => {
    setShowAllExercises(!showAllExercises);
  };

  // Calculate exercise-specific progress
  const getExerciseProgress = (period) => {
    if (selectedExercise === 'all') {
      return {
        exercises: period.exercises,
        progress: period.progress,
        sessions: period.sessions.total
      };
    } else {
      const exerciseCount = period.sessions.byExercise[selectedExercise] || 0;
      const totalExercises = Object.values(period.sessions.byExercise).reduce((a, b) => a + b, 0);
      const progress = totalExercises > 0 ? Math.round((exerciseCount / totalExercises) * 100) : 0;
      
      return {
        exercises: exerciseCount,
        progress: progress,
        sessions: exerciseCount
      };
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Profile Edit Card - Left Side */}
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', height: '100%' }}>
              {/* ... (existing profile edit content remains the same) ... */}
            </Card>
          </Grid>

          {/* Progress Stats - Right Side */}
          <Grid item xs={12} md={6}>
            <Card elevation={4} sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    <FitnessCenterIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Exercise Progress
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<VisibilityIcon />}
                    onClick={toggleShowAllExercises}
                  >
                    {showAllExercises ? 'Collapse' : 'View All'}
                  </Button>
                </Stack>

                {/* Exercise Selector */}
                <Select
                  fullWidth
                  value={selectedExercise}
                  onChange={handleExerciseChange}
                  sx={{ mb: 3 }}
                >
                  {exerciseOptions.map((exercise) => (
                    <MenuItem key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </MenuItem>
                  ))}
                </Select>

                {/* Sessions Completed */}
                <Box sx={{ 
                  backgroundColor: 'primary.light', 
                  p: 2, 
                  borderRadius: 2, 
                  mb: 3,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6" color="primary.contrastText">
                    Sessions Completed: {getExerciseProgress(progressData.year).sessions}
                  </Typography>
                  {selectedExercise !== 'all' && (
                    <Chip 
                      label={exerciseOptions.find(e => e.id === selectedExercise)?.name || ''}
                      color="primary"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>

                {/* Today's Progress */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">
                      <CalendarTodayIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                      Today
                    </Typography>
                    <Typography variant="body2">
                      {getExerciseProgress(progressData.today).exercises} exercises
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={getExerciseProgress(progressData.today).progress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                
                {/* This Week */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">
                      <TimelineIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                      This Week
                    </Typography>
                    <Typography variant="body2">
                      {getExerciseProgress(progressData.week).exercises} exercises
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={getExerciseProgress(progressData.week).progress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                
                {/* Expanded View (when "View All" is clicked) */}
                {showAllExercises && (
                  <>
                    {/* This Month */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">
                          <TimelineIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                          This Month
                        </Typography>
                        <Typography variant="body2">
                          {getExerciseProgress(progressData.month).exercises} exercises
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={getExerciseProgress(progressData.month).progress} 
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    
                    {/* This Year */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">
                          <TimelineIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                          This Year
                        </Typography>
                        <Typography variant="body2">
                          {getExerciseProgress(progressData.year).exercises} exercises
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={getExerciseProgress(progressData.year).progress} 
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                  </>
                )}

                {/* Overall Progress Circle */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress 
                      variant="determinate" 
                      value={getExerciseProgress(progressData.year).progress} 
                      size={100}
                      thickness={6}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {getExerciseProgress(progressData.year).progress}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}