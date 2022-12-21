// @ts-nocheck
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomizedSnackbar } from "../../Utils/CustomizedSnackbar";
import { setUser } from "../../store/userSlice";
import cl from "./Authorization.module.scss";

const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginRef = useRef();
  const passwordRef = useRef();
  const [loginOnBlur, setLoginOnBlur] = useState(false);
  const [passwordOnBlur, setPasswordOnBlur] = useState(false);
  const [textSubmitButton, setTextSubmitButton] = useState("LOGIN");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const authURL = baseURL + "/auth";

  const accessURL = baseURL + "/access";
  const resetFrom = () => {
    setLogin("");
    setPassword("");
    loginRef.current.blur();
    passwordRef.current.blur();
    setLoginOnBlur(false);
    setPasswordOnBlur(false);
    setOpenSnackbar(true);
    setTextSubmitButton("LOGIN");
  };
  const authenticateUser = () => {
    axios
      .post(authURL, { login, password }, { timeout: 600 })
      .then((response) => {
        const { login } = response.data;
        const auth = { login: login.toLowerCase() };
        localStorage.setItem("auth", JSON.stringify(auth));
        dispatch(setUser({ login: login.toLowerCase() }));
      })
      .catch((error) => {
        resetFrom();
      });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setTextSubmitButton("Logging...");
    authenticateUser();
  };

  const stylesForTextFields = {
    width: "100%",
    "&.label": {
      fontSize: "1.5rem",
    },
  };
  return (
    <div className={cl.authWrapper}>
      <CustomizedSnackbar
        originOfSnackbar={{ horizontal: "center", vertical: "top" }}
        message="Login or password is incorrect!"
        severity="error"
        autoHide={2500}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <h1>Sign in</h1>
      <form onSubmit={onSubmit} className={cl.loginWrapper}>
        <TextField
          inputRef={loginRef}
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
          inputRef={passwordRef}
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
          disabled={login.trim().length === 0 || password.trim().length === 0 || textSubmitButton === "Logging..."}
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
