import React, { useState, useEffect } from 'react';
import { fetchMoviesByName } from 'services/ApiServices';
import { useSearchParams, Link, useLocation} from 'react-router-dom';
import { CardFilm } from 'components/Home/CardFilm';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { loadingStatus } from 'services/loadingStatus';
import styles from 'components/Home/GalleryFilm.module.css'

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [error, setError] = useState('');
    const [status, setStatus] = useState(loadingStatus.IDLE);
    const location = useLocation()
    
    
    useEffect(() => {
        if (name === null) return;
        if (name === '') {
            return alert('not name')
        }
        setStatus(loadingStatus.PENDING);
        setMovies([]);
        
        fetchMoviesByName(name, page)
            .then(response => response.results)
            .then(films => {
                setMovies(films);
                setPage(page);
                setStatus(loadingStatus.RESOLVED);
            })
            .catch(error => {
                setError(error.message);
                setStatus(loadingStatus.REJECTED);
            });
    }, [name, page]);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.currentTarget;
        setSearchParams({ name: form.name.value });
        form.reset();
    };
    const loreMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    if (status === loadingStatus.PENDING) {
        return <Loader loader={Loader} />;
    }

    if (status === loadingStatus.RESOLVED) {
        <h2>{error.message}</h2>;
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" />
                <button type="submit">Search</button>
            </form>
            {(status === loadingStatus.RESOLVED) &&
                (<div>
                    <ul className={styles.gallery}>
                        {movies.map(movie => (
                            <Link to={`/movies/${movie.id}`} movieId={movie.id} key={movie.id} state={{ from: location }} >
                                <CardFilm film={movie} key={movie.id} />
                            </Link>
                        ))}
                    </ul>
                    <Button onClick={loreMore}>Load more</Button></div>)}
        </>
    );
    
};


export default Movies;