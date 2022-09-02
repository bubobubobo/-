import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>SHOW ME WHAT YOU GOT</h1>
      <Link to={"/signin"}>signin</Link>
      <Link to={"/signup"}>signup</Link>
    </div>
  );
};

export default Header;
