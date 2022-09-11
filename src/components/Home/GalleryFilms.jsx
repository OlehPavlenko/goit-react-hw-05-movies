import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchMoviesDay } from 'services/ApiServices';
import { CardFilm } from './CardFilm';
import { Button } from '../Button/Button';
import { Loader } from 'components/Loader/Loader';
import { loadingStatus } from 'services/loadingStatus';
import styles from './GalleryFilm.module.css'

export const GalleryFilms = () => {
    const [page, setPage] = useState(1);
    const [films, setFilms] = useState([]);
    const [error, setError] = useState('');
    const [status, setStatus] = useState(loadingStatus.IDLE);
    const location = useLocation()

    
    useEffect(() => {
        setStatus(loadingStatus.PENDING);
        fetchMoviesDay(page)
            .then(response => response.results)
            .then(films => {
                setFilms(films);
                setPage(page);
                setStatus(loadingStatus.RESOLVED);
            })
            .catch(error => {
                setError(error.message);
                setStatus(loadingStatus.REJECTED);
            });
    }, [page]);

    const loreMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (status === loadingStatus.PENDING) {
        return <Loader loader={Loader} />;
    }

    if (status === loadingStatus.RESOLVED) {
        <h2>{error.message}</h2>;
    }


    if (status === loadingStatus.RESOLVED) {
        return (
            <div>
                <ul className={styles.gallery}>
                    {films.map(film => (
                        <Link to={`/movies/${film.id}`} movieId={film.id} key={film.id} state={{ from: location }}>
                            <CardFilm film={film} key={film.id} />
                        </Link>
                    ))}
                </ul>

                <Button onClick={loreMore}>Load more</Button>
            </div>
        );
    }
};