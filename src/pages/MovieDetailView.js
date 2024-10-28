import React, { useLayoutEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieRecommendations } from "../fetch/agent";
import MovieSlider from "../components/MovieSliderView";
import "../styleFiles/movieScreenViewStyle.css";

// Define the cutoff date as 01-09-2024
const cutoffDate = new Date("2024-09-01");

function MovieDetailView() {
  const { movieID } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState();
  const [recommendations, setRecommendations] = useState([]);

  const fetchMovie = async () => {
    // Fetch movie details
    try {
      await getMovieDetails(movieID)
        .then((response) => setMovie(response))
        .catch((error) => console.error(error));
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      await getMovieRecommendations(movieID, 1)
        .then((response) => {
          let data = response?.results?.filter((movie) => {
            // Convert the release_date string to a Date object
            const releaseDate = new Date(movie.release_date);
            console.log(releaseDate + " - " + releaseDate > cutoffDate);
            // Return movies where the release_date is after the cutoff date
            return releaseDate > cutoffDate;
          });
          setRecommendations(data || []);
        })
        .catch((error) => console.error(error));
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  // You can fetch movie details based on the movieID here, for example, using useEffect

  useLayoutEffect(() => {
    try {
      setIsLoading(true);
      if (movieID) {
        fetchMovie();
      }
      if (movieID) {
        fetchRecommendations();
      }
    } catch (e) {}
  }, [movieID]);

  // Extract the genre names from the genres array
  const genreNames = movie?.genres?.map((genre) => genre.name).join(", ");

  if (!movie || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="movie-screen">
        <div className="movie-detail-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
            alt={movie.title}
          />
        </div>

        {/* <div
        style={{
          border: "1px solid",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          paddingLeft: 20,
        }}
      >
        <h1 style={{fontSize:50}}>
          {movie?.title}{" "}
          <span>({new Date(movie.release_date).getFullYear()})</span>
        </h1>
        <div style={{fontSize:18}}>
          <text>{movie.release_date}</text>
          <text> • {genreNames}</text>
          <text> • {movie.runtime + "m"}</text>
        </div>

        <div style={{color:'white', display:'flex', flexDirection:'column', fontSize:18, marginTop:40}}>
          <text style={{fontSize:30, fontWeight:'bold'}}>Overview</text>
          <text style={{fontWeight:100}}>{movie.overview}</text>
        </div>
      </div> */}
        <div className="movie-details">
          <h1 style={{ fontSize: 50 }}>
            {movie?.title}{" "}
            <span>({new Date(movie.release_date).getFullYear()})</span>
          </h1>
          <div className="movie-meta">
            <span style={{ fontSize: 25 }}>{movie.release_date}</span>
            <span style={{ fontSize: 25 }}> • {genreNames}</span>
            <span style={{ fontSize: 25 }}> • {movie.runtime + "m"}</span>
          </div>
          <div className="user-score">
            <div className="score-circle">{movie.vote_average}/10</div>
          </div>
          <div className="movie-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <MovieSlider movies={recommendations} />
    </div>
  );
}

export default MovieDetailView;
