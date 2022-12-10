// @ts-nocheck
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
      dispatch(setUser({ login: auth.toString() }));
    }
    setCheckedLogged(true);
  }, []);

  return (
    <>
      {checkedLogged ? (
        <Routes>
          <Route path="cctv" element={<Layout />}>
            <Route index element={user.login ? <CarInfo /> : <Authorization />} />
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
