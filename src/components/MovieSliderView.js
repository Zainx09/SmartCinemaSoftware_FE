import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styleFiles/MovieSlider.css";

const MovieSlider = ({ movies }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const moviesPerSlide = 5;
  const totalSlides = Math.ceil(movies.length / moviesPerSlide);

  // Move to a specific movie slide based on index
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto slide effect (moves one movie at a time)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [totalSlides]);

  // Update slide position when currentIndex changes
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        <div
          className="slider"
          ref={slideRef}
          style={{ display: "flex", transition: "transform 0.5s ease-in-out"}}
        >
          {/* {movies.map((movie, index) => (
            <div className="movie-slide" key={index} style={{ flex: '0 0 20%' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-slider"
              />
              <h3>{movie.title}</h3>
            </div>
          ))} */}

          {movies.map((movie, index) => (
            // <div
            //   key={index}
            //   className="movie-card"
            //   onClick={() => navigate(`/${movie.id}`)}
            // >
            <div style={{flex: "0 0 20%", border:'0px solid', display:'flex', flexDirection:'column', height:'100%', padding:40}}>
            <div
              className="movie-slide"
              key={index}
              style={{ flex: "0 0 20%" }}
              onClick={()=>navigate(`/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-slider"
              />
              <h3>{movie.title}</h3>
              {/* <p>{movie.overview}</p> */}

              <p className={`movie-overview`}>{movie.overview}</p>
              <a
                style={{ border: "0px solid", fontSize: 12 }}
                href={() => navigate(`/${movie.id}`)}
                // onClick={toggleReadMore}
              >
                {/* {isExpanded ? "Read Less" : "Read More"} */}
                Read More
              </a>

              {/* <p>
                <strong>Genres:</strong> {movie.genres.join(", ")}
              </p> */}
              <p>
                <strong>Rating:</strong> {movie.vote_average} / 10
              </p>
              <p>
                <strong>Duration:</strong> {movie.runtime} min
              </p>
            </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render dots for navigation */}
      <div className="dots-container">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
