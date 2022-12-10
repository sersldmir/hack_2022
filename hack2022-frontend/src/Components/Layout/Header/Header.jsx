// @ts-nocheck
import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../store/userSlice";
import cl from "./Header.module.scss";
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <header className={cl.wrapper}>
      <img className={cl.logo} src={require("../../../imgs/logo.png")} alt="logo" />
      <h1>CCTV</h1>
      {user.login ? (
        <Button
          sx={{ fontWeight: "1000" }}
          variant="outlined"
          color="error"
          onClick={() => {
            localStorage.clear();
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
