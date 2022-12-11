// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Authorization from "../Authorization/Authorization";
import CarInfo from "../CarInfo/CarInfo";
import Layout from "../Layout/Layout";

const MainRouter = () => {
  const [checkedLogged, setCheckedLogged] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth) {
      setAuthenticated(true);
    }
    setCheckedLogged(true);
  }, []);

  return (
    <>
      {checkedLogged ? (
        <Routes>
          <Route path="cctv" element={<Layout />}>
            <Route index element={authenticated ? <CarInfo /> : <Authorization />} />
            {/* <Route path="auth" element={<Authorization />} /> */}
          </Route>
          <Route path="*" element={<Navigate to={"cctv"} replace />} />
        </Routes>
      ) : (
        <></>
      )}
    </>
  );
};

export default MainRouter;
