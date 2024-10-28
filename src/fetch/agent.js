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
const handleError = (error) => {
  console.error("API Error:", error.message || error);
  throw error;
};

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
