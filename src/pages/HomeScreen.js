import React, { useState } from "react";
import ExploreScreen from "./ExploreScreen";
import MoviesGridView from "../components/MoviesGridView";
import SignupView from "../components/SignupView";

import "../App.css";

const bgImg = "../../public/background.png";

function HomeScreen() {
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
      {/* <div> */}
      {/* <ExploreScreen /> */}
      {/* <h1>Face Detection and Recognition</h1>
        <button onClick={handleDetect}>Detect</button>
        <button onClick={handleRecognize}>Recognize</button>
        {recognitionResult && <p>{recognitionResult}</p>} */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "80%",
          }}
        >
          <MoviesGridView />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "20%",
            backgroundColor: "white",
            opacity: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            overflow:'hidden',
            border:'3px solid'
          }}
        >
          <SignupView />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
