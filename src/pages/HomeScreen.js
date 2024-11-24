import React, { useState } from "react";
import ExploreScreen from "./ExploreScreen";
import MoviesGridView from "../components/MoviesGridView";
import SignupView from "../components/SignupView";
import UserDetailView from "../components/UserDetailView";
import { useUser } from "../ContextApi/UserContext";
import AllMoviesView from "../components/AllMoviesView";
import SignupForm from "../components/SignupForm";

import "../App.css";

const bgImg = "../../public/background.png";

function HomeScreen() {
  const { user, setUser } = useUser();
  // const user = {"email":"zain@gmail.com","id":"671851c4fcc86bd7fdca568f","phone":"03132525514","username":"zain"}

  const [recognitionResult, setRecognitionResult] = useState(null);

  const backgroundStyle = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: "cover",
    height: "100vh",
    backgroundPosition: "center",
  };

  // Function to handle detect request
  const handleDetect = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/detect", {
        method: "GET",
        timeout: 120000, // 60 seconds
      });
      const data = await response.json();
      console.log("Detection complete:", data);
    } catch (error) {
      console.error("Error during detection:", error);
    }
  };

  // Function to handle recognition request
  const handleRecognize = async () => {
    try {
      const response = await fetch("http://localhost:5000/recognize", {
        method: "GET",
      });
      const data = await response.json();
      if (data.match_percentage) {
        setRecognitionResult(`Match Percentage: ${data.match_percentage}%`);
      } else {
        setRecognitionResult("No match found");
      }
    } catch (error) {
      console.error("Error during recognition:", error);
    }
  };

  return (
    <div className="background">
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          paddingTop: 60,
        }}
      >
        {!user ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "95vh",
                width: "75%",
                overflowY:'hidden'
                // paddingTop:60
              }}
            >
              <MoviesGridView />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "102%",
                width: "25%",
                backgroundColor: "white",
                opacity: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                border: "0px solid",
                marginTop: -15,
              }}
            >
              {<SignupView />}
            </div>
          </>
        ) : (
          <AllMoviesView user={user}/>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
