// @ts-nocheck
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import cl from "./Authorization.module.scss";
const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginOnBlur, setLoginOnBlur] = useState(false);
  const [passwordOnBlur, setPasswordOnBlur] = useState(false);
  const [textSubmitButton, setTextSubmitButton] = useState("LOGIN");
  const dispatch = useDispatch();
  const stylesForTextFields = {
    width: "100%",
    "&.label": {
      fontSize: "1.5rem",
    },
  };
  return (
    <div className={cl.authWrapper}>
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTextSubmitButton("Loading...");
          const responseOK = true;
          if (responseOK) {
            localStorage.setItem("auth", `{login: ${login}}`);
            dispatch(setUser({ login }));
          } else {
            setTextSubmitButton("LOGIN");
          }
        }}
        className={cl.loginWrapper}
      >
        <TextField
          sx={stylesForTextFields}
          id="login"
          label="Login"
          value={login}
          onBlur={() => {
            setLoginOnBlur(true);
          }}
          onChange={(e) => {
            setLogin(e.target.value);
          }}
          error={login.trim().length === 0 && loginOnBlur}
          helperText={login.trim().length === 0 && loginOnBlur ? "Enter valid login!" : ""}
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
          error={password.trim().length === 0 && passwordOnBlur}
          onBlur={() => {
            setPasswordOnBlur(true);
          }}
          helperText={password.trim().length === 0 && passwordOnBlur ? "Enter valid password" : ""}
        />

        <Button
          disabled={login.trim().length === 0 || password.trim().length === 0 || textSubmitButton === "Loading..."}
          type="submit"
          sx={{ width: "100%", fontSize: "1rem", fontFamily: "sans-serif" }}
          variant="contained"
        >
          {textSubmitButton}
        </Button>
      </form>
    </div>
  );
};

export default Authorization;
