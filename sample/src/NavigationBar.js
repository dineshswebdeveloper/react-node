import React from "react";
import { Link } from "react-router-dom";
function NavigationBar() {
  return (
    <div className=" text-center">
      <div className="d-flex gap-2 justify-content-center">
        <Link to={"/layout"}>Layout</Link>
        <Link to={"/delete"}>Delete</Link>
        <Link to={"/edit"}>Edit</Link>
        <Link to={"/admin"}>Admin</Link>
      </div>
    </div>
  );
}

export default NavigationBar;
