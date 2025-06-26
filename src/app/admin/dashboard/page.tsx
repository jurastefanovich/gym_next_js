"use client";
import {
  BarChart as BarChartIcon,
  FitnessCenter as FitnessCenterIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import GymInfo from "./components/GymInfo";
import Members from "./components/Members";
import Sessions from "./components/Sessions";
import Trainers from "./components/Trainers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const initialTab = tabParam ? parseInt(tabParam) : 0;

  const [activeTab, setActiveTab] = useState(initialTab);

  React.useEffect(() => {
    const parsedTab = parseInt(tabParam || "0");
    if (!Number.isNaN(parsedTab) && parsedTab !== activeTab) {
      setActiveTab(parsedTab);
    }
  }, [tabParam]);

  const handleTab = (newValue: number) => {
    setActiveTab(newValue);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newValue.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Box sx={{ display: "flex", mt: 8, minHeight: "100vh" }}>
      <Paper sx={{ width: 240, p: 2, minHeight: "100vh" }}>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={(_, newValue) => handleTab(newValue)}
        >
          <Tab label="Dashboard" icon={<BarChartIcon />} />
          <Tab label="Gym Info" icon={<LocationIcon />} />
          <Tab label="Members" icon={<PeopleIcon />} />
          <Tab label="Trainers" icon={<FitnessCenterIcon />} />
          <Tab label="Sessions" icon={<ScheduleIcon />} />
        </Tabs>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {activeTab === 0 && <Dashboard />}
        {activeTab === 1 && <GymInfo />}
        {activeTab === 2 && <Members />}
        {activeTab === 3 && <Trainers />}
        {activeTab === 4 && <Sessions />}
      </Box>
    </Box>
  );
};

export default DashboardPage;
