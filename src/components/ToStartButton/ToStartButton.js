import styles from '../../css/ToStartButton.module.scss';

const ToStartButton = ({ setDefaultSettings }) => {

    const toStart = () => {
        setDefaultSettings();
    }

    return (
        <button onClick={toStart} className={styles.ToStartButton}>
            To Start
        </button>
    );
}

export default ToStartButton;