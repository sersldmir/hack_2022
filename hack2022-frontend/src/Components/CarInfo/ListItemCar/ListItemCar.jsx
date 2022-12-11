import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { Box, ListItem, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import React from "react";

export const ListItemCar = ({openHandler, carNumber, color}) => {
  return (
    <ListItem
      onClick={openHandler}
      component="div"
      disablePadding
      secondaryAction={
        <Tooltip title={"Машина на территорий"}>
          <Box aria-label="comment">
            <CircleRoundedIcon sx={{ color }} />
          </Box>
        </Tooltip>
      }
    >
      <ListItemButton>
        <ListItemText primary={carNumber} />
      </ListItemButton>
    </ListItem>
  );
};
