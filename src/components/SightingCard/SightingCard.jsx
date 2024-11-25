import { Typography } from "@mui/material";
import { format } from "date-fns";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";

function SightingCard({ sightingData }) {
  return (
    <div className="sighting-card">
      <Paper elevation={2} sx={{ borderRadius: "20px" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={sightingData.note}
            secondary={`Seen on ${format(sightingData.sighted_at, "MMM do")}`}
          />
        </ListItem>
      </Paper>
    </div>
  );
}

export default SightingCard;
