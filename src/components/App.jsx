import React, {lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Loader } from 'components/Loader/Loader';
import { Navigation } from 'components/Navigation/Navigation';


const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const MovieReviews  = lazy(() => import("components/MoviesDetails/MovieReviews"));
const MovieCast  = lazy(() => import("components/MoviesDetails/MovieCast"));
const MovieDetailts = lazy(() => import("../pages/MovieDetailts"));
const NotFound = lazy(() => import("../pages/NotFound"));


export default function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:movieId" element={<MovieDetailts />} >
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/movies" element={<Movies />} />
          <Route element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};