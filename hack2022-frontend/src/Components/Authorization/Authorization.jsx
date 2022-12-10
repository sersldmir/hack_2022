import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import cl from "./Authorization.module.scss";
const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const styledForTextFields = {
    width: "100%",
  };
  return (
    <div className={cl.authWrapper}>
      <h1 className="">Sign in</h1>
      <form action="#" className={cl.loginWrapper}>
        <TextField
          sx={styledForTextFields}
          id="login"
          label="Login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
        />
        <TextField
          sx={styledForTextFields}
          id="password"
          type={"password"}
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button sx={{ width: "100%", fontSize: "1rem" }} variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Authorization;
