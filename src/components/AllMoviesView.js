// src/pages/MoviesView.js
import React, { useEffect, useState } from "react";
import MovieCarouselView from "./MovieCarouselView";
import {
  FaHome,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaUserMd,
} from "react-icons/fa";
import {
  getRecommendedMovies,
  getUserWatchedMovies,
  getNowPlaying,
  getPopularNowPlaying,
  getReviewsRecommendedMovies,
} from "../fetch/agent";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AllMoviesView = ({ user }) => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [reviewRecommended, setReviewRecommended] = useState([]);
  const [famousMovies, setFamousMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNowPlaying = () => {
    // Fetch movie details
    getNowPlaying(user.id)
      .then((response) => setNowPlaying(response?.data || []))
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const fetchRecommended = () => {
    // Fetch movie details
    getRecommendedMovies(user.id)
      .then((response) => setRecommended(response?.data || []))
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const fetchPopularNowPlaying = () => {
    // Fetch movie details
    getPopularNowPlaying()
      .then((response) => setFamousMovies(response?.data || []))
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const fetchReviewRecommended = () => {
    // Fetch movie details
    getReviewsRecommendedMovies(user.id)
      .then((response) => setReviewRecommended(response?.data || []))
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      fetchNowPlaying();
      fetchRecommended();
      fetchPopularNowPlaying();
      fetchReviewRecommended();
      // alert(JSON.stringify(user));
    }
  }, []);

  if (
    !nowPlaying.length &&
    !recommended.length &&
    !famousMovies.length &&
    !reviewRecommended?.length
  ) {
    return <p>No data available</p>;
  }

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Spin size={50} /> */}
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 60,
                color: "white",
              }}
              spin
            />
          }
        />
      </div>
    );
  }

  return (
    <div
      style={{
        // width: "100vh",
        width: "100%",
        height: "100vh",
        overflowY: "scroll",
        padding: "10px 20px",
        color: "white",
      }}
    >
      {/* {JSON.stringify(nowPlaying)} */}
      {/* {JSON.stringify(recommendated)} */}
      {!!nowPlaying?.length && (
        <div style={{ width: "100%", paddingBottom: 30 }}>
          <MovieCarouselView title="Now Playing" movies={nowPlaying} />
        </div>
      )}
      {!!recommended?.length && (
        <div style={{ width: "100%", paddingBottom: 30 }}>
          <MovieCarouselView title="Recommended Movies" movies={recommended} />
        </div>
      )}
      {!!reviewRecommended?.length && (
        <div style={{ width: "100%", paddingBottom: 30 }}>
          <MovieCarouselView title="Recommended Movies based on similar Reviews" movies={reviewRecommended} />
        </div>
      )}
      
      {!!famousMovies?.length && (
        <div style={{ width: "100%", paddingBottom: 80 }}>
          <MovieCarouselView title="Famous Movies" movies={famousMovies} />
        </div>
      )}
    </div>
  );
};

export default AllMoviesView;
