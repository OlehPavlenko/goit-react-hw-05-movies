import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMoviesByReviews } from 'services/ApiServices';
import { Loader } from 'components/Loader/Loader';
import { loadingStatus } from 'services/loadingStatus';
import styles from './MovieCast.module.css'

const MovieReviews = () => {
    const [reviews, setReviews] = useState([]);
    let { movieId } = useParams('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState(loadingStatus.IDLE);
    

    useEffect(() => {
        setStatus(loadingStatus.PENDING);
        fetchMoviesByReviews(movieId)
            .then(response => response.results)
            .then(reviews => {
                setReviews(reviews);
                setStatus(loadingStatus.RESOLVED);
                if (reviews.length < 1) {
                    setStatus(loadingStatus.REJECTED);
                    alert('There are no reviews yet...')
                }
            })
            .catch(error => {
                setError(error.message);
                setStatus(loadingStatus.REJECTED);
            });
    }, [movieId]);
    
    if (status === loadingStatus.PENDING) {
        return <Loader loader={Loader} />;
    }


    if (status === loadingStatus.REJECTED) {
        <h2>{error.message}</h2>;
    }

    if (status === loadingStatus.RESOLVED) {
        return (<div>
            <ul className={styles.CastsList}>
                {reviews.map(review => (
                    <li key={review.id} className={styles.CastsItem}>
                        <h2>author: {review.author}</h2>
                        <p>content: {review.content}</p>
                    </li>
                ))}
            </ul>
        
        </div>
        );
    }
};
export default MovieReviews;