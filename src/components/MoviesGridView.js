import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styleFiles/moviesGridViewStyle.css"; // Include some styling for the grid view
import { Link, useNavigate } from 'react-router-dom';

const MoviesGridView = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies from Flask API when the component mounts
    axios
      .get("http://localhost:5000/get_nowPlaying_movies")
      .then((response) => {
        // const data = JSON.parse(response.data);
        const data = response.data;

        if (data.status === "success") {
          setMovies(data.movies);
        } else {
          console.error("Error fetching movies:", data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container">
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        // border: "3px solid yellow",
        overflowY: "scroll",
      }}
    >
      <h1 className="heading">Now Playing</h1>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card" onClick={()=>navigate(`/${movie.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster-grid"
            />
            {/* <h3>{movie.title}</h3>

            <p className={`movie-overview`}>
              {movie.overview}
            </p>
            <a 
              style={{border:'0px solid', fontSize:12}}
              href={()=>navigate(`/${movie.id}`)}
              // onClick={toggleReadMore}
              >
              Read More
            </a>

            <p>
              <strong>Genres:</strong> {movie.genres.join(", ")}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Duration:</strong> {movie.runtime} min
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesGridView;
