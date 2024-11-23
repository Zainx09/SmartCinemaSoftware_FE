// src/pages/MoviesView.js
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { updateFavoriteMovie } from "../fetch/agent";
import { FaHome, FaRegHeart, FaHeart, FaTicketAlt } from "react-icons/fa";

const ImgCard = ({ movie, ratingStyle,watched }) => {
  const navigate = useNavigate();

  return (
    <div
      key={movie.id}
      className="movie-card"
      onClick={() => navigate(`/${watched ? "watched/" : ""}${movie.id}`)}
      // style={{boxShadow: "0 -1px 5px white"}}
    >
      
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="movie-poster-grid"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          // color: "white",
          marginTop: -5,
          justifyContent: "center",
          fontWeight: "bold",
          border: "0px solid white",
          padding: "0px 5px 2px 5px",
        }}
      >
        {/* <text>{movie.title}</text> */}
        <text style={ratingStyle || {color:'white'}}>Ratings: {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</text>
      </div>

      <div
        style={{
          width: "100%",
          // left:'5%',
          display: "flex",
          height: 50,
          backgroundColor: "white",
          opacity: 0.1,
          position: "absolute",
          bottom: -5,
          zIndex: -1,
          borderRadius:'0px 0px 30px 30px'
        }}
      />
    </div>
  );
};

export default ImgCard;
