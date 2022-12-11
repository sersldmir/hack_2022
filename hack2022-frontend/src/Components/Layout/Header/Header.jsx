// @ts-nocheck

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../store/userSlice";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import cl from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <header className={cl.wrapper}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CCTV
            </Typography>
            {user.login ? (
              <Button
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                  dispatch(logout());
                }}
              >
                Выход
              </Button>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
};

export default Header;
