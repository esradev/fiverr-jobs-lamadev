import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import {Link, useLocation} from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const {pathname} = useLocation()

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "wpstorm",
    isSeller: true,
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
          <span className="text">Fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sing in</span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && <button>Join</button>}
          {currentUser && (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60" alt="" />
              <span>{currentUser?.username}</span>
              {open &&
                  <div className="options">
                {currentUser?.isSeller && (
                    <>
                      <Link className="link" to="/gigs">Gigs</Link >
                      <Link className="link" to="/add-new-gig">Add New Gig</Link >
                    </>
                )}
                <Link className="link" to="/orders">Orders</Link >
                <Link className="link" to="/messages">Messages</Link >
                <Link className="link" to="/">Logout</Link >
              </div>}
            </div>
          )}
        </div>
      </div>
      {active || pathname !=="/" && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="">Fiverr Business</Link >
            <Link className="link" to="">Explore</Link >
            <Link className="link" to="">English</Link >
            <Link className="link" to="">Sing in</Link >
            <Link className="link" to="">Become a Seller</Link >
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
