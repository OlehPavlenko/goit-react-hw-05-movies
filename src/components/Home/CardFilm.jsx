import React from 'react';
import { BASE_IMG_URL } from 'services/ApiBaseUrl';
import styles from './CardFilm.module.css'


export const CardFilm = ({ film }) => {
    return (
        <li key={film.id} className={styles.cardItem}>
            <img src={BASE_IMG_URL + film.poster_path} id={film.id} alt={film.title} className={styles.cardItemImage} />
            {film.title ? (
                <h2 id={film.id} className={styles.title}> {film.title} </h2>
            ) : (
                <h2 id={film.id} className={styles.title}>{film.name}</h2>
            )}
        </li>
    );
};