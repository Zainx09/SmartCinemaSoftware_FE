import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "../App.css"; // Assuming you'll define basic styling here
import { getUserInfo } from "../fetch/agent"; // Importing the getUserInfo function
import SignupForm from "./SignupForm";

const SignupView = () => {
  const [isShowSignUp, setIsShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // Function to handle button click and call getUserInfo
  const handleExploreClick = async () => {
    try {
      setIsLoading(true);
      const response = await getUserInfo();
      if (response?.status) {
        setUserInfo(response?.userDetail);
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

  useEffect(() => {
    setUserInfo(null);
  }, []);

  if (isShowSignUp) {
    return (
      <div className="container-signin-view">
        <SignupForm setShowSignUp={setIsShowSignUp} />
      </div>
    );
  }

  return (
    <div className="container-signin-view">
      {!!userInfo?.username ? (
        <>
          <text style={{fontSize:24, fontWeight:'bold'}}>{`Welcome Back`}</text>
          <text style={{fontSize:24, fontWeight:'bold'}}>{`${userInfo?.username?.toUpperCase()}`}</text>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SignupView;
