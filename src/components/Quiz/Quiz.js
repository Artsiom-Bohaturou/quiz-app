import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { getQuestions } from '../../api/api';
import styles from '../../css/Quiz.module.scss';
import Button from '../Button/Button';
import Navigation from '../Navigation/Navigation';
import ToStartButton from '../ToStartButton/ToStartButton';

const Quiz = ({ quizSettings }) => {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isChecked, setChecked] = useState(true);

    useEffect(() => {
        if (quizSettings.isQuizStart) {
            (async () => {
                const data = await getQuestions({
                    category: quizSettings.currentSettings.category.value,
                    difficult: quizSettings.currentSettings.difficult.value,
                    limit: quizSettings.currentSettings.limit.value,
                });
                if (typeof data === 'number') {
                    quizSettings.notfoundQuestions();
                    setSelectedAnswer(null);
                } else {
                    quizSettings.startQuiz(data);
                    setSelectedAnswer(null);
                    setChecked(false);
                }
            })();
        }
    }, [quizSettings.isQuizStart]);

    const gameEnd = () => {
        quizSettings.setDefaultSettings();
        setChecked(true);
    }

    return (
        <main className={styles.Quiz}>
            {
                quizSettings.isLoading ? 'Loading...' :
                    <>
                        <div className={styles.QuestionContainer}>
                            <h2>{quizSettings.currentQuestion}</h2>
                            <span hidden={!quizSettings.isQuizStart || quizSettings.isGameEnd}>Score: {quizSettings.userScore}</span>
                        </div>
                        {quizSettings.hasError || quizSettings.isGameEnd ?
                            <ToStartButton setDefaultSettings={gameEnd} /> :
                            <>
                                <div className={styles.AnswersList}>
                                    {
                                        quizSettings.currentAnswers.map((e, i) => e ?
                                            <Button key={i}
                                                isChecked={isChecked}
                                                isQuizStart={quizSettings.isQuizStart}
                                                correctAnswer={quizSettings.currentCorrectAnswer}
                                                selectedAnswer={selectedAnswer}
                                                setSelectedAnswer={setSelectedAnswer}
                                                answer={e} />
                                            : null)
                                    }
                                </div>
                                <Navigation quizSettings={quizSettings}
                                    selectedAnswer={selectedAnswer}
                                    isChecked={isChecked}
                                    setSelectedAnswer={setSelectedAnswer}
                                    setChecked={setChecked}
                                />

                            </>
                        }
                    </>
            }
        </main>
    );
}

export default observer(Quiz);