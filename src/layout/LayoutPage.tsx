import React from "react";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div>
      <h1> LayoutPage </h1>
      <Outlet />
    </div>
  );
};

export default LayoutPage;
