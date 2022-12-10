// @ts-nocheck
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { selectUser, setUser } from "../../store/userSlice";
import Authorization from "../Authorization/Authorization";
import CarInfo from "../CarInfo/CarInfo";
import Layout from "../Layout/Layout";

const MainRouter = () => {
  const [checkedLogged, setCheckedLogged] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      dispatch(setUser({ login: auth.login }));
    }
    setCheckedLogged(true);
  }, []);

  return (
    <>
      {checkedLogged ? (
        <Routes>
          <Route path="cctv" element={<Layout />}>
            <Route index element={user.login ? <CarInfo /> : <Authorization />} />
          </Route>
          <Route path="*" element={<Navigate to={"cctv"} replace />} />
        </Routes>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
          <CircularProgress size={"10rem"} />
        </Box>
      )}
    </>
  );
};

export default MainRouter;
