import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styleFiles/moviesGridViewStyle.css"; // Include some styling for the grid view
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../ContextApi/UserContext";
import ImgCard from "../widgets/ImgCard";
import { getNowPlaying, getFavMovies } from "../fetch/agent";

const MoviesGridView = ({ isFavView, title }) => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);


  const scrollableDivRef = useRef(null);

  // Scroll to the top of the div
  const scrollToTop = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling
      });
    }
  };

  useEffect(() => {
    if (isFavView && user?.id) {
      getFavMovies(user.id)
        .then((response) => setMovies(response?.data || []))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    } else {
      // Fetch movies from Flask API when the component mounts
      getNowPlaying()
        .then((response) => setMovies(response?.data || []))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [user?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container">
    <div
      ref={scrollableDivRef}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        // border: "3px solid yellow",
        overflowY: "scroll",
        padding: "0px 40px",
      }}
    >
      
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: '26%',
            backgroundColor: "#40a9ff",
            color: "#fff",
            borderRadius: "10px",
            width: "60px",
            height: "60px",
            fontSize: "25px",
            cursor: "pointer",
            // boxShadow: "0px 0px 6px white",
            zIndex: 1000,
            border:'none'
          }}
        >
          ↑
        </button>
       
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "95%",
          justifyContent: "flex-start",
          borderBottom: "1px solid white",
          paddingBottom: 15,
          marginBottom: 10,
        }}
      >
        <h1 className="heading">{title || "Now Playing"}</h1>
      </div>
      {/* <text style={{ color: "white" }}>{JSON.stringify(user)}</text> */}
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <ImgCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesGridView;
