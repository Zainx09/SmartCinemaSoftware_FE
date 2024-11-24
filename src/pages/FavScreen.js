import React, { useEffect, useState } from "react";
import { getFavMovies } from "../fetch/agent";
import ImgCard from "../widgets/ImgCard";
import MoviesGridView from "../components/MoviesGridView";
import { useUser } from "../ContextApi/UserContext";
import MovieCarouselView from "../components/MovieCarouselView";

import "../App.css";

const bgImg = "../../public/background.png";

function FavScreen() {
  const { user, setUser } = useUser();
  const [favMovies, setFavMovies] = useState([]);

  const fetchFav = () => {
    // Fetch movie details
    getFavMovies(user.id)
      .then((response) => setFavMovies(response?.data || []))
      .catch((error) => console.error(error))
      .finally(() => {
        // setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user?.id) {
      fetchFav();
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
        {!!favMovies?.length && (
          <div style={{ width: "100%", paddingBottom: 30 }}>
            <MovieCarouselView
              title="Favourite Movies"
              movies={[...favMovies]}
              isExpanded={true}
              hideIsExpandedBtn={true}
            />
          </div>
        )}
      </div>
    </div>
    // <div className="background" style={{minHeight:'100vh', paddingTop: 60,}}>
    //   {/* <div
    //     style={{
    //       flex: 1,
    //       display: "flex",
    //       flexDirection: "row",
    //       flexWrap: "wrap",
    //       height: "100%",
    //       minHeight: "100vh",
    //       width: "100%",
    //       overflow: "hidden",
    //       paddingTop: 60,
    //     }}
    //   > */}
    //     <MoviesGridView isFavView={true}/>
    //     {/* <div style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', width:'100%'}} className="movie-grid-carousel">
    //       {favMovies?.map((movie) => (
    //         <ImgCard movie={movie} />
    //       ))}
    //       {favMovies?.map((movie) => (
    //         <ImgCard movie={movie} />
    //       ))}
    //       {favMovies?.map((movie) => (
    //         <ImgCard movie={movie} />
    //       ))}
    //       {favMovies?.map((movie) => (
    //         <ImgCard movie={movie} />
    //       ))}
    //       {favMovies?.map((movie) => (
    //         <ImgCard movie={movie} />
    //       ))}

    //     </div>*/}

    //   {/* </div>  */}
    // </div>
  );
}

export default FavScreen;
