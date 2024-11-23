// src/pages/MoviesView.js
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImgCard from "../widgets/ImgCard";
import { Button } from "antd";

const MovieCarouselView = ({ title, movies, titleStyle, ratingStyle, isExpanded, hideIsExpandedBtn, watched }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpand, setIsExpand] = useState(isExpanded || false);

  // Show up to 5 movies per page
  const moviesPerPage = 8;
  const totalMovies = movies?.length || 0;

  const handleNext = () => {
    if (currentIndex + moviesPerPage < totalMovies) {
      setCurrentIndex(currentIndex + moviesPerPage);
    }
  };

  const handlePrevious = () => {
    if (currentIndex - moviesPerPage >= 0) {
      setCurrentIndex(currentIndex - moviesPerPage);
    }
  };

  if(!movies?.length){
    return null
  }

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        border: "0px solid white",
        maxHeight: isExpand ? undefined : 500,
        // color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "99%",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0px 10px",
          borderBottom: "1px solid gray",
          paddingBottom: 5,
          marginBottom: 20,
        }}
      >
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
          <h1 style={titleStyle || { color: "white" }}>{title}</h1>
          {movies?.length > 8 && !hideIsExpandedBtn && <Button
            style={{
              marginLeft: 20,
              marginBottom:-5,
              fontSize: 16,
              fontWeight: "bold",
              borderRadius: "0px 20px 20px 0px",
              backgroundColor: "white",
              color: "black",
              border: "0px",
            }}
            onClick={() => setIsExpand(!isExpand)}
          >
            {isExpand ? "Collapse" : "Expand"}
          </Button>}
        </div>

        {!isExpand && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* Previous Button */}
            {currentIndex > 0 && (
              <Button
                style={{
                  marginRight: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                  borderRadius: "20px 0px 0px 20px",
                  backgroundColor: "white",
                  color: "gray",
                  border: "0px",
                }}
                onClick={handlePrevious}
              >
                {"<"} Prev
              </Button>
            )}

            {/* Next Button */}
            {currentIndex + moviesPerPage < totalMovies && (
              <Button
                style={{
                  marginRight: 5,
                  fontSize: 16,
                  fontWeight: "bold",
                  borderRadius: "0px 20px 20px 0px",
                  backgroundColor: "white",
                  color: "gray",
                  border: "0px",
                }}
                onClick={handleNext}
              >
                Next {">"}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Movie Cards */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          padding: "0px 10px",
          flexWrap: "wrap",
          height: "100%",
        }}
      >
        {/* Movie List */}
        <div
          style={{
            display: "flex",
            overflowX: "hidden",
            width: "100%",
            height: "100%",
            marginTop: -20,
            flexWrap: "wrap",
          }}
          className="movie-grid-carousel"
        >
          {!isExpand ? 
          movies?.slice(currentIndex, currentIndex + moviesPerPage)
            ?.map((movie) => (
              <ImgCard movie={movie} ratingStyle={ratingStyle} />
            ))
          :
          movies
            ?.map((movie) => (
              <ImgCard movie={movie} ratingStyle={ratingStyle} watched={watched}/>
            ))
            }
        </div>

        {/* Next Button */}
        {/* {currentIndex + moviesPerPage < totalMovies && (
          <button
            onClick={handleNext}
            style={{
              cursor: "pointer",
              fontSize: "35px",
              fontWeight: "bold",
              backgroundColor: "transparent",
              border: "none",
              // marginRight: '10px',
              color: "gray",
              position: "relative",
              padding: "100px 25px",
              marginLeft: -15,
            }}
          >
            {">"}
          </button>
        )} */}
      </div>
    </div>
  );
};

export default MovieCarouselView;
