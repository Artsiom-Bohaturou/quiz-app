import styles from '../../css/Button.module.scss';

const Button = ({ answer, setSelectedAnswer, selectedAnswer, correctAnswer, isChecked, isQuizStart }) => {
    let btnStyles = `${styles.AnswerBtn}`;

    if (selectedAnswer === answer) {
        btnStyles += ` ${styles.Selected}`;
    }

    if (isChecked && isQuizStart && answer === correctAnswer) {
        btnStyles += ` ${styles.Correct}`;
    } else if (isChecked && isQuizStart && answer !== correctAnswer) {
        btnStyles += ` ${styles.Incorrect}`;
    }

    const selectAnswer = (event) => {
        setSelectedAnswer(answer);
    }

    return (
        <button disabled={isChecked && isQuizStart} onClick={selectAnswer} className={btnStyles}>
            {answer}
        </button>
    );
}

export default Button;