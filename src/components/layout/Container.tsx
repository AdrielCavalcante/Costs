import { ReactNode } from 'react';
import styles from './Container.module.scss';

type ContainerProps = {
    children?: ReactNode;
    custom: string;
};

function Container({ ...props}: ContainerProps) {
    return (
        <div className={`${styles.container} ${styles[props.custom]}`}>
            {props.children}
        </div>
    );
}

export default Container;