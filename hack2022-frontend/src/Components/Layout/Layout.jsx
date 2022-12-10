import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <header>Header</header>
      {<Outlet />}
    </div>
  );
};

export default Layout;
