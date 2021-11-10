import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`navbar ${show && "navbar_black"}`}>
      <img
        className="logo"
        src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
        alt="logo"
      />
      <img
        className="avatar"
        src="https://i.pinimg.com/564x/c3/3b/32/c33b322b61b8f30f0df1d0b3de690734.jpg"
        alt="logo"
      />
    </div>
  );
}

export default Navbar;
