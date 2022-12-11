import React from "react";
import { Outlet } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const Layout = () => {
  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CCTV
          </Typography>
          <Button color="inherit">Выход</Button>
        </Toolbar>
      </AppBar>
    </Box>
      {<Outlet />}
    </div>
  );
};

export default Layout;
