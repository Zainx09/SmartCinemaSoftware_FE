import axios from "axios";

// General API configuration (secured headers)
const apiKey = process.env.REACT_APP_TMDB_API_KEY; // Store sensitive data in environment variables

// Create an axios instance with default settings
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/", // Base URL for TMDB API
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

// Create an axios instance with default settings
const apiFlask = axios.create({
  baseURL: "http://127.0.0.1:5000/", // Base URL for TMDB API
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
});

// General function to handle API response
const handleResponse = (response) => {
  if (response.status === 200) {
    return response.data; // Return JSON data
  } else {
    throw new Error(`Error: ${response.status}`);
  }
};

// Function to handle API errors
// const handleError = (error) => {
//   // console.error("API Error:", error.message || error);
//   // throw error;
//   console.error(
//     "API Error:",
//     error.response?.data?.msg || error.message || error
//   );
//   return {
//     status: error.response?.status,
//     message: error.response?.msg || "An unknown error occurred",
//   };
// };

const handleError = (error) => {
  console.error("API Error:", error?.response);
  throw error;
  // throw new Error(error.response?.data?.msg || "An unknown error occurred");
  // return { status: null, message: error.response?.data?.msg || "An unknown error occurred" }; // Return error object
};

// function transformRequest(request, headers) {
//   return JSON.stringify(request);
// }


// API call to get user info from the Flask backend
export const getUserInfo = async () => {
  try {
    // Flask endpoint call
    const response = await apiFlask.get("recognize"); // Calling 'recognize' Flask endpoint
    return handleResponse(response); // Handling the API response using handleResponse
  } catch (error) {
    handleError(error); // Handling errors
  }
};

export const signin = async (formData) => {
  try {
    // alert(JSON.stringify(formData))
    // Flask endpoint call
    const response = await apiFlask.post("signIn", formData); // Calling 'recognize' Flask endpoint
    return handleResponse(response); // Handling the API response using handleResponse
  } catch (error) {
    handleError(error); // Handling errors
  }
};

export const signup = async (formData) => {
  try {
    // Flask endpoint call
    const response = await apiFlask.post("signUp", formData); // Calling 'recognize' Flask endpoint
    return handleResponse(response); // Handling the API response using handleResponse
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API call to get movie details by ID
export const getMovieDetails = async (movieID) => {
  try {
    const response = await api.get(`movie/${movieID}?language=en-US`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// API call to get movie recommendations by movie ID
export const getMovieRecommendations = async (movieID, page) => {
  try {
    const response = await api.get(
      `movie/${movieID}/recommendations?language=en-US&page=${page}`
    );
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

// API to fetch show details by movie ID
export const getShowsDetails = async (movieId) => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`getShowDetails?id=${movieId}`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to book seats for a selected show
export const bookSeats = async ({ movie_id, show_datetime, booked_seats }) => {
  try {
    // Flask endpoint call to book seats
    const response = await apiFlask.post("bookSeats", {
      movie_id,
      show_datetime,
      booked_seats,
    });
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to fetch now playing
export const getNowPlaying = async (userId) => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`get_nowPlaying_movies`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to fetch popular now playing
export const getPopularNowPlaying = async () => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`popularNowPlayingMovies`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to fetch recommendedMovies
export const getRecommendedMovies = async (userId) => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`recommendedMovies?userId=${userId}`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to fetch recommendedMovies based on reviews
export const getReviewsRecommendedMovies = async (userId) => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`reviewRecommendedMovies?userId=${userId}`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to user watched movies
export const getUserWatchedMovies = async (userId) => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`getWatchedMovies?userId=${userId}`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// API to fetch recommendedMovies
export const getFavMovies = async (userId) => {
  try {
    // Flask endpoint call with movie ID
    const response = await apiFlask.get(`getFavoriteMovies?userId=${userId}`);
    return handleResponse(response); // Handling the API response
  } catch (error) {
    handleError(error); // Handling errors
  }
};

// Function to update favorite movie
export const updateFavoriteMovie = async (userId, movieId, remove = false) => {
  try {
    const response = await apiFlask.post("updateFavoriteMovie", {
      userId,
      movieId,
      remove
    });
    return response.data; // Return the API response
  } catch (error) {
    console.error("Error updating favorite movie:", error);
    throw error; // Throw error for the calling function to handle
  }
};