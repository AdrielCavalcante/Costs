import { FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa';

import styles from './Footer.module.scss';

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <a href="https://www.youtube.com/channel/UCnwWUs1KaZT0bsFF5sfAp_Q" target="_blank" rel="noreferrer"><li><FaYoutube /></li></a>
                <a href="https://github.com/AdrielCavalcante/Costs" target="_blank" rel="noreferrer"><li><FaGithub /></li></a>
                <a href="https://www.linkedin.com/in/adriel-cavalcante/" target="_blank" rel="noreferrer"><li><FaLinkedin /></li></a>
            </ul>
            <p className={styles.copyright}><span>Costs</span> &copy; 2021</p>
        </footer>
    );
}

export default Footer;