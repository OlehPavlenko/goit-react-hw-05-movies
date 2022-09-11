import { BASE_URL, API_KEY } from './ApiBaseUrl';

export const handleResponseLink = response => {
    if (response.ok) {
        return response.json();
    }
    console.error('server response: ', response.status);
    throw new Error('Sorry, something went wrong ...');
};
function fetchMoviesDay(page) {
    return fetch(
        `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false`
    ).then(handleResponseLink);
}

function fetchMoviesByName(movies, page) {
    return fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${movies}`
    ).then(handleResponseLink);
}
function fetchMoviesByDetails(movieId) {
    return fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    ).then(handleResponseLink);
}
function fetchMoviesByCredits(movieId) {
    return fetch(
        `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    ).then(handleResponseLink);
}
function fetchMoviesByReviews(movieId) {
    return fetch(
        `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
    ).then(handleResponseLink);
}

export {
    fetchMoviesByName,
    fetchMoviesDay,
    fetchMoviesByDetails,
    fetchMoviesByCredits,
    fetchMoviesByReviews,
};