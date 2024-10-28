import React from "react";
import { Button } from "antd";
import "../App.css";

import MoviesGridView from "../components/MoviesGridView";

function ExploreScreen() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100%",
        overflow:'hidden'
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
          opacity: 0.8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{}}>
          <h1>Welcome</h1>
          <Button style={{ width: '100%', fontWeight:'bold', fontSize:18}} type="primary">Start Explore</Button>
        </div>
      </div>
    </div>
  );
}
 
export default ExploreScreen;
