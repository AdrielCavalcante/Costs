import { Link } from 'react-router-dom';
import styles from './LinkButton.module.scss';

type LinkButtonProps = {
    to: string;
    text: string;
};

function LinkButton({to, text}: LinkButtonProps) {
    return (
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    );
}

export default LinkButton;