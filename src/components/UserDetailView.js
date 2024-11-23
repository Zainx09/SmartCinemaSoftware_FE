// src/pages/UserProfile.js
import React from "react";
import { Button } from "antd";
import { useUser } from "../ContextApi/UserContext";

function UserDetailView() {
  const { user, setUser } = useUser();

  if (!user) {
    return <p>No user is logged in.</p>; // Show this if user is null
  }

  const handleExit = () => {
    setUser(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        padding: "20px",
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* User Info Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        //   backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          width: "80%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>User Information</h2>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>

      {/* Exit Button Section */}
      <div style={{ marginTop: "20px" }}>
        {/* <button 
          onClick={handleExit} 
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Exit
        </button> */}
        <Button
          onClick={handleExit}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          End Session
        </Button>
      </div>
    </div>
  );
}

export default UserDetailView;
