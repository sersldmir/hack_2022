import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CarInfo from "../CarInfo/CarInfo";
import Layout from "../Layout/Layout";

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="cctv" element={<Layout />}>
          <Route index element={<CarInfo />} />
        </Route>
        <Route path="*" element={<Navigate to={"cctv"} />} />
      </Routes>
    </>
  );
};

export default MainRouter;
