import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

export const Navigation = () => (
    <nav className={styles.nav}>
        <NavLink
            exact
            to="/"
            className={styles.navLink}
        
        >
            Home
        </NavLink>

        <NavLink
            to="/movies"
            className={styles.navLink}
        
        >
            Movies
        </NavLink>
    </nav>
);