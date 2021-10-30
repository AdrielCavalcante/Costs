import { Link } from 'react-router-dom';
 
import Container from '../Container/Container';

import styles from './Navbar.module.scss';
import logo from '../../../img/costs_logo.png';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div> 
                <Container custom="min-height">
                    <Link to="/">
                        <img src={logo} alt="Costs" />
                    </Link>
                    <ul className={styles.list}>
                        <li className={styles.item}><Link to="/">Home</Link></li>
                        <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                    </ul>
                </Container>
            </div>
        </nav>
    );
}

export default Navbar;