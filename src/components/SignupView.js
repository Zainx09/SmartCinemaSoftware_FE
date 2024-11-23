import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "../App.css"; // Assuming you'll define basic styling here
import { getUserInfo } from "../fetch/agent"; // Importing the getUserInfo function
import SignupForm from "./SignupForm";
import { useUser } from "../ContextApi/UserContext";

const SignupView = () => {
  const { user, setUser } = useUser();
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false)
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
        <SignupForm setShowSignUp={setIsShowSignUp}/>
      </div>
    );
  }

  return (
    <div className="container-signin-view">
      <h1 className="welcome-msg-signin-view">Hello!</h1>
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
