import styles from '../../css/Navigation.module.scss';

const Navigation = ({ quizSettings, isChecked, selectedAnswer, setSelectedAnswer, setChecked }) => {

    const onNextBtnClick = (event) => {
        if (quizSettings.currentAnswers.indexOf(selectedAnswer) !== -1 && isChecked) {
            if (quizSettings.isQuizStart) {
                quizSettings.setNextQuestion();
                setChecked(false);
                setSelectedAnswer(null);
            } else {
                quizSettings.changeSettings(quizSettings.settingsQuestions[quizSettings.questionCount], selectedAnswer);
                quizSettings.currentSettings[quizSettings.settingsQuestions[quizSettings.questionCount]]
                    && setSelectedAnswer(quizSettings.currentSettings[quizSettings.settingsQuestions[quizSettings.questionCount]].value);
            }
        }
    }

    const onBackBtnClick = (event) => {
        quizSettings.previousSetting();
        setSelectedAnswer(quizSettings.currentSettings[quizSettings.settingsQuestions[quizSettings.questionCount]].value);
    }

    const onCheckClick = (event) => {
        setChecked(true);

        if (selectedAnswer === quizSettings.currentCorrectAnswer) {
            quizSettings.increaseUserScore();
        }
    }

    return (
        <div className={styles.NavigationButtons}>
            <button
                className={quizSettings.questionCount && !quizSettings.isQuizStart ? styles.Active : null}
                onClick={onBackBtnClick}
                disabled={!quizSettings.questionCount || quizSettings.isQuizStart}>Back</button>
            <button
                hidden={!quizSettings.isQuizStart}
                className={selectedAnswer ? styles.Active : null}
                disabled={!selectedAnswer}
                onClick={onCheckClick}>Check Answer</button>
            <button
                className={selectedAnswer && isChecked ? styles.Active : null}
                onClick={onNextBtnClick}>Next</button>
        </div>);
}

export default Navigation;