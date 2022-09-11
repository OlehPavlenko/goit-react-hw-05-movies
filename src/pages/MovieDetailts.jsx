import React, { useState, useEffect} from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { fetchMoviesByDetails } from 'services/ApiServices';
import { BASE_IMG_URL } from '../services/ApiBaseUrl';
import { Loader } from 'components/Loader/Loader';
import { loadingStatus } from 'services/loadingStatus';
import styles from 'components/Navigation/Navigation.module.css'


const MovieDetailts = () => {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState(loadingStatus.IDLE);
    const location = useLocation()

    useEffect(() => {
        setStatus(loadingStatus.PENDING);
        fetchMoviesByDetails(movieId)
            .then(movie => {
                setMovie(movie);
                setStatus(loadingStatus.RESOLVED);
            })
            .catch(error => {
                setError(error.message);
                setStatus(loadingStatus.REJECTED);
            });
    }, [movieId]);


    const backLink = location.state?.from ?? "/"


    if (status === loadingStatus.PENDING) {
        return <Loader loader={Loader} />;
    }

    if (status === loadingStatus.REJECTED) {
        <h2>{error.message}</h2>;
    }
    
    if (status === loadingStatus.RESOLVED) {
        return (
            <div>
                <img src={BASE_IMG_URL + movie.poster_path} alt="" />
                <h2>{movie.title}</h2>
                <p> {movie.overview} </p>
                <p>Vote: {movie.vote_average}</p>
                <p>Data: {movie.release_date}</p>
        
                <ul className={styles.nav}>
        
                    <li>
                        <Link to="cast" className={styles.link} state={{ from: location.state.from }}>Cast</Link>
                    </li>
                    <li>
                        <Link to="reviews" className={styles.link} state={{ from: location.state.from }}>Reviews</Link>
                    </li>
        
                </ul>
                <Outlet />
                <Link to={backLink} className={styles.link} >Go back</Link>
            </div>
        );
    }
};


export default MovieDetailts;