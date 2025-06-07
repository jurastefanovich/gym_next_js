import { Background } from "@/app/_features/enums/Colors";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import { Alert } from "@mui/material";
import React from "react";
interface ServiceMessage {
  individual: boolean;
  needsTrainer: boolean;
}
const ServiceMessage: React.FC<ServiceMessage> = ({
  needsTrainer,
  individual,
}) => {
  if (needsTrainer && individual) {
    return (
      <Alert
        severity="info"
        icon={<PersonIcon sx={{ color: "white" }} />}
        sx={{ mb: 4, backgroundColor: Background.PRIMARY }}
      >
        This is an individual training session with a dedicated trainer.
      </Alert>
    );
  }
  if (!needsTrainer && !individual) {
    return (
      <Alert
        severity="info"
        icon={<GroupsIcon sx={{ color: "white" }} />}
        sx={{ backgroundColor: Background.PRIMARY, color: "white", mb: 4 }}
      >
        This is a group session that doesn't require a trainer.
      </Alert>
    );
  }
  if (!needsTrainer && individual) {
    return (
      <Alert
        severity="info"
        icon={<PersonIcon sx={{ color: "white" }} />}
        sx={{ backgroundColor: Background.PRIMARY, mb: 4 }}
      >
        This is an individual session that doesn't require a trainer.
      </Alert>
    );
  }
  if (needsTrainer && !individual) {
    return (
      <Alert
        severity="info"
        icon={<GroupsIcon sx={{ color: "white" }} />}
        sx={{ backgroundColor: Background.PRIMARY, color: "white", mb: 4 }}
      >
        This is a group training session with a trainer.
      </Alert>
    );
  }
  return null;
};

export default ServiceMessage;
