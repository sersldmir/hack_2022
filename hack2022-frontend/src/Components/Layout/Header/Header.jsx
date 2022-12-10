// @ts-nocheck
import { Button } from "@mui/material";
import React from "react";
import cl from "./Header.module.scss";
const Header = () => {
  return (
    <header className={cl.wrapper}>
      <img className={cl.logo} src={require("../../../imgs/logo.png")} alt="logo" />
      <h1>CCTV</h1>
      <Button sx={{ fontWeight: "1000" }} variant="outlined" color="error">
        Logout
      </Button>
    </header>
  );
};

export default Header;
