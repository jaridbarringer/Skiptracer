import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import GroupIcon from "@mui/icons-material/Group";
import { useEffect } from "react";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/" },
  { text: "Upload CSV", icon: <AssignmentReturnedIcon />, path: "/uploadcsv" },
  { text: "Land Owners", icon: <GroupIcon />, path: "/landowners" },
  { text: "Analytics", icon: <AnalyticsRoundedIcon /> },
  { text: "Clients", icon: <PeopleRoundedIcon /> },
  { text: "Tasks", icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon /> },
  { text: "About", icon: <InfoRoundedIcon /> },
  { text: "Feedback", icon: <HelpRoundedIcon /> },
];

export default function MenuContent() {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    const currentPath = location.pathname;
    const index = mainListItems.findIndex((item) => item.path === currentPath);
    if (index !== -1) {
      setSelectedItem(index);
    }
  }, [location.pathname]);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setSelectedItem(index)}
          >
            <Link to={item.path}>
              <ListItemButton selected={index === selectedItem}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}