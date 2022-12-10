import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import cl from "./Authorization.module.scss";
const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const stylesForTextFields = {
    width: "100%",
    "&.label": {
      fontSize: "1.5rem",
    },
  };
  return (
    <div className={cl.authWrapper}>
      <h1 className="">Sign in</h1>
      <form action="#" className={cl.loginWrapper}>
        <TextField
          sx={stylesForTextFields}
          id="login"
          label="Login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <TextField
          sx={stylesForTextFields}
          id="password"
          type={"password"}
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button sx={{ width: "100%", fontSize: "1rem", fontFamily: "sans-serif" }} variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Authorization;
