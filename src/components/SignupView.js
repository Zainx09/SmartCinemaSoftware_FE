import React, { useEffect, useState } from "react";
import { Button, Spin, notification } from "antd";
import "../App.css"; // Assuming you'll define basic styling here
import { getUserInfo } from "../fetch/agent"; // Importing the getUserInfo function
import SignupForm from "./SignupForm";
import { useUser } from "../ContextApi/UserContext";

const SignupView = () => {
  const { user, setUser } = useUser();
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle button click and call getUserInfo
  const handleExploreClick = async () => {
    try {
      setIsLoading(true);
      const response = await getUserInfo();
      if (response?.status) {
        setUser(response?.userDetail);
        // alert(response?.status);
      } else {
        notification.error({
          message: "Didn't Recognize You. Please Sign Up or Sign In",
          // description: error.message,
        });
        setIsShowSignUp(true);
        // alert(response?.status);
      }
      console.log("User Info:", response); // Log response from the API
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isShowSignUp) {
    return (
      <div className="container-signin-view">
        <SignupForm setShowSignUp={setIsShowSignUp} />
      </div>
    );
  }

  return (
    <div className="container-signin-view">
      <h1 className="welcome-msg-signin-view">Welcome!</h1>

      {!isLoading && <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop:-5,
          marginBottom:25
        }}
      >
        <strong style={{fontSize:20, fontWeight:'bold'}}>Your Next Adventure Begins Here</strong>
        <strong style={{fontSize:20, fontWeight:'bold'}}>Start Exploring your favourite movies now</strong>
      </div>}

      {!!isLoading && (
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <strong style={{ fontSize: 18 }}>Please wait</strong>
          <strong style={{ fontSize: 18, marginBottom: 10 }}>
            Trying to recognize you!
          </strong>
          <Spin />
        </div>
      )}
      {/* <button className="explore-btn-signin-view" onClick={handleExploreClick}>
        Start Explore
      </button> */}
      <Button
        loading={isLoading}
        disabled={isLoading}
        type={"primary"}
        style={{ fontSize: 18, fontWeight: "bold" }}
        onClick={handleExploreClick}
      >
        Start Explore
      </Button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          width: "100%",
          color: "black",
          cursor: "pointer",
          marginTop: 5,
          fontWeight: "bold",
        }}
        onClick={() => setIsShowSignUp(true)}
      >
        <text>
          Or{" "}
          {
            <a
              style={{
                cursor: "pointer",
                fontSize: 16,
                borderBottom: "1px solid",
              }}
            >
              {"Sign Up"}
            </a>
          }{" "}
          {/* {!isSignIn && "manually"}? */}
        </text>
      </div>
    </div>
  );
};

export default SignupView;
