import React, { useEffect, useState } from "react";
import { getFavMovies, getUserWatchedMovies } from "../fetch/agent";
import ImgCard from "../widgets/ImgCard";
import MoviesGridView from "../components/MoviesGridView";
import { useUser } from "../ContextApi/UserContext";
import MovieCarouselView from "../components/MovieCarouselView";

import "../App.css";

const bgImg = "../../public/background.png";

function WatchedMoviesScreen() {
  const { user, setUser } = useUser();
  const [watchedMovies, setWatchedMovies] = useState([]);

  const fetchWatched = () => {
    // Fetch movie details
    getUserWatchedMovies(user.id)
      .then((response) => setWatchedMovies(response?.data || []))
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user?.id) {
      fetchWatched();
    }
  }, [user?.id]);

  return (
    <div className="background">
      <div
        style={{
          // width: "100vh",
          width: "100%",
          height: "100vh",
          overflowY: "scroll",
          padding: "10px 20px",
          color: "white",
          paddingTop: 60,
        }}
      >
        {!!watchedMovies?.length && (
          <div style={{ width: "100%", paddingBottom: 30 }}>
            <MovieCarouselView
              title="Watched Movies"
              movies={[...watchedMovies]}
              isExpanded={true}
              hideIsExpandedBtn={true}
              watched={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WatchedMoviesScreen;
