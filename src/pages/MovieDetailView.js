import React, { useLayoutEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieRecommendations,
  getFavMovies,
  updateFavoriteMovie
} from "../fetch/agent";
import MovieSlider from "../components/MovieSliderView";
import MovieCarouselView from "../components/MovieCarouselView";
import { FaHome, FaRegHeart, FaHeart, FaTicketAlt } from "react-icons/fa";
import "../styleFiles/movieScreenViewStyle.css";
import { Button } from "antd";
import TicketBooking from "../components/TicketBookingView";
import { useUser } from "../ContextApi/UserContext";

// Define the cutoff date as 01-09-2024
const cutoffDate = new Date("2024-09-01");

function MovieDetailView() {
  const { movieID } = useParams();
  const { user, setUser } = useUser();
  const [isBuyTicket, setIsBuyTicket] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState();
  const [favMovies, setFavMovies] = useState();
  const [isFavMovie, setIsFavMovie] = useState(false);
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

  const fetchFav = () => {
    // Fetch movie details
    getFavMovies(user.id)
      .then((response) => {
        let favMovies = response.data;
        if (favMovies && movieID) {
          let found = favMovies?.find((movie) => movie.id == movieID);
          if (found) {
            setIsFavMovie(true);
          } else {
            setIsFavMovie(false);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
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

  const updateFavMovie = (remove = false) => {
    // Fetch movie details
    updateFavoriteMovie(user.id, movieID, remove)
      .then((response) => {
        setIsFavMovie(!isFavMovie)
        // let favMovies = response.data;
        // if (favMovies && movieID) {
        //   let found = favMovies?.find((movie) => movie.id == movieID);
        //   if (found) {
        //     setIsFavMovie(true);
        //   } else {
        //     setIsFavMovie(false);
        //   }
        // }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
  };
  // You can fetch movie details based on the movieID here, for example, using useEffect

  useLayoutEffect(() => {
    try {
      setIsBuyTicket(false);
      setIsLoading(true);

      if (user?.id && movieID) {
        fetchFav();
      }
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
    <div style={{ paddingTop: 50, border: "0px solid red" }}>
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
            <span style={{ fontSize: 20 }}>
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </h1>
          <div className="movie-meta">
            <span style={{ fontSize: 20 }}>{movie.release_date}</span>
            <span style={{ fontSize: 20 }}> • {genreNames}</span>
            <span style={{ fontSize: 20 }}> • {movie.runtime + "m"}</span>
          </div>
          <div className="user-score">
            <div className="score-circle">
              {movie.vote_average?.toFixed(1)} / 10
            </div>
          </div>
          <div>
            <h3 style={{ color: "darkgray", fontSize: 24 }}>Overview</h3>
            <p
              style={{
                width: "90%", // or set to a specific width like '200px'
                wordWrap: "break-word", // Wrap long words to the next line
                overflowWrap: "break-word", // Ensures compatibility for wrapping
                border: "0px solid red",
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginLeft: 0,
                textAlign: "justify",
                // paddingRight:100
                // maxWidth:400
              }}
            >
              {movie.overview}
            </p>

            <div
              style={{ display: "flex", flexDirection: "row", marginTop: 60 }}
            >
              <Button
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "black",
                  backgroundColor: "#d9aa1d",
                  borderWidth: 0,
                  height: 50,
                }}
                onClick={()=>{
                  if(isFavMovie){
                    updateFavMovie(true)
                  }else{
                    updateFavMovie(false)
                  }
                }}
              >
                {!!isFavMovie ? (
                  <FaHeart style={{ color: "red" }} />
                ) : (
                  <FaRegHeart />
                )}
                {isFavMovie ? "Remove from " : "Add to "} Favourite
              </Button>
              <Button
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#118378",
                  borderWidth: 0,
                  height: 50,
                  marginLeft: 20,
                }}
                onClick={() => {
                  setIsBuyTicket(true);
                  window.scrollBy({ top: 480, behavior: "smooth" });
                }}
              >
                <FaTicketAlt />
                Buy Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <MovieSlider movies={recommendations} /> */}

      {!!isBuyTicket && <TicketBooking movieID={movieID} />}

      <div style={{ width: "100%", paddingBottom: 30, marginTop: 50 }}>
        <MovieCarouselView
          title="Recommendations"
          movies={recommendations}
          titleStyle={{ color: "black" }}
          ratingStyle={{ color: "black" }}
        />
      </div>
    </div>
  );
}

export default MovieDetailView;
