import styles from './SubmitButton.module.scss';

type SubmitButtonProps = {
    text: string;
};

function SubmitButton({ text }: SubmitButtonProps) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    );
}

export default SubmitButton;