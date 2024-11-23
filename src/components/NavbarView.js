import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Button } from "antd";
import "../App.css"; // Assuming you'll define basic styling here
import { useUser } from "../ContextApi/UserContext";
import {
  FaHome,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUserMd,
  FaHeart,
  FaFilm,
} from "react-icons/fa";

const NavbarView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    setShowModal(false);
    navigate("/");
  };

  return (
    <div style={{ border: "0px solid blue" }}>
      {/* Navigation Bar */}
      <nav
        className="navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 35px 10px 30px",
          border: "0px solid red",
        }}
      >
        <ul style={{ display: "flex", listStyleType: "none" }}>
          <li>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: location.pathname === "/" ? "black" : "gray",
              }}
            >
              <FaHome style={{ marginRight: "8px", marginBottom: -2 }} />
              <strong>Home</strong>
            </Link>
            {
              !!user && <>
                <Link
                  to="/favourites"
                  style={{
                    textDecoration: "none",
                    color:
                      location.pathname === "/favourites" ? "black" : "gray",
                    marginLeft: 30,
                  }}
                >
                  <FaHeart style={{ marginRight: "8px", marginBottom: -2 }} />
                  <strong>Favourites</strong>
                </Link>

                <Link
                  to="/watched-movies"
                  style={{
                    textDecoration: "none",
                    color:
                      location.pathname === "/watched-movies"
                        ? "black"
                        : "gray",
                    marginLeft: 30,
                  }}
                >
                  <FaFilm style={{ marginRight: "8px", marginBottom: -2 }} />
                  <strong>Watched Movies</strong>
                </Link>
              </>
            }
          </li>
        </ul>

        {user && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaUserMd />
            <span
              style={{
                marginRight: "10px",
                fontWeight: "bold",
                color: "black",
                padding: "0px 20px 0px 5px",
                fontSize: 18,
              }}
            >
              {user.username?.toUpperCase()}
            </span>
            <FaCog
              style={{ cursor: "pointer", fontSize: 22 }}
              onClick={() => setShowModal(!showModal)}
            />

            {!!showModal && (
              <div
                style={{
                  width: "10000vh",
                  height: "10000vh",
                  backgroundColor: "gray",
                  position: "absolute",
                  left: 0,
                  zIndex: -10,
                  opacity: 0,
                }}
                onClick={() => setShowModal(false)}
              />
            )}

            {!!showModal && (
              <div
                style={{
                  position: "absolute",
                  top: "60px",
                  right: "30px",
                  width: "270px",
                  padding: "15px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0px 0px 20px black",
                  zIndex: 1000,
                }}
              >
                <p style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
                  <span
                    style={{ color: "black", fontSize: 18, fontWeight: "500" }}
                  >
                    Email:
                  </span>{" "}
                  {user.email}
                </p>
                <p style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
                  <strong
                    style={{ color: "black", fontSize: 18, fontWeight: "500" }}
                  >
                    Phone:
                  </strong>{" "}
                  {user.phone}
                </p>
                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "8px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                    marginTop: "30px",
                    fontSize: 18,
                    fontWeight: "bold",
                    justifyContent: "center",
                  }}
                >
                  <FaSignOutAlt style={{ marginRight: "10px" }} /> Exit Session
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavbarView;
