import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddProductPage from "./AddProductPage";
import OrderBrowse from "./OrderBrowse";
import UserManagement from "./UserManagement";

const Admin = () => {
  return (
    <>
      <div className="flex">
        <div id="leftPanel" className="w-1/5 h-screen bg-slate-600 p-2">
          <AddProductPage />
        </div>

        <div
          id="rightPanel"
          className="w-4/5 h-screen p-2 flex flex-col bg-slate-500 space-y-4"
        >
          <OrderBrowse />
          <UserManagement />
        </div>
      </div>
    </>
  );
};

export default Admin;
