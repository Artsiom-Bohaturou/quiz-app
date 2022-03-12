import { makeAutoObservable } from "mobx";

const LINUX = 'Linux';
const DEVOPS = 'DevOps';
const DOCKER = 'Docker';
const JS = 'Javascript';
const PHP = 'Php';

const EASY = 'Easy';
const MEDIUM = 'Medium';
const HARD = 'Hard';

const ERR_MESSAGE = 'There is no questions with that parameters :(';
const WIN_MESSAGE = 'Your score is:';

class Quiz {
    currentSettings = {
        category: {
            question: 'Select Category',
            answers: [LINUX, DEVOPS, DOCKER, JS, PHP],
            value: '',
        },
        difficult: {
            question: 'Select Difficult',
            answers: [EASY, MEDIUM, HARD],
            value: '',

        },
        limit: {
            question: 'Select Questions Limit',
            answers: [5, 10, 15, 20],
            value: 0,
        },
    }
    settingsQuestions = ['category', 'difficult', 'limit'];
    questionCount = 0;
    currentQuestion = this.currentSettings[this.settingsQuestions[this.questionCount]].question;
    currentAnswers = this.currentSettings[this.settingsQuestions[this.questionCount]].answers;
    isQuizStart = false;
    isLoading = false;
    questions = [];
    currentCorrectAnswer = '';
    hasError = false;
    userScore = 0;
    isGameEnd = false;

    constructor() {
        makeAutoObservable(this);
    }

    updateQuestion(question, answer) {
        this.currentQuestion = question;
        this.currentAnswers = answer;
    }

    changeSettings = (setting, value) => {
        this.currentSettings[setting].value = value;
        this.questionCount += 1;
        if (this.questionCount === Object.keys(this.currentSettings).length) {
            this.isQuizStart = true;
            this.isLoading = true;
        } else {
            this.updateQuestion(this.currentSettings[this.settingsQuestions[this.questionCount]].question,
                this.currentSettings[this.settingsQuestions[this.questionCount]].answers);
        }
    }

    previousSetting() {
        this.questionCount -= 1;
        this.updateQuestion(this.currentSettings[this.settingsQuestions[this.questionCount]].question,
            this.currentSettings[this.settingsQuestions[this.questionCount]].answers);
    }

    startQuiz(questionsList) {
        this.questions = questionsList;
        this.isLoading = false;
        this.questionCount = -1;
        this.setNextQuestion();
    }

    notfoundQuestions() {
        this.updateQuestion(ERR_MESSAGE, []);
        this.hasError = true;
        this.isLoading = false;
    }

    setDefaultSettings = () => {
        this.hasError = false;
        this.questionCount = 0;
        this.updateQuestion(this.currentSettings[this.settingsQuestions[this.questionCount]].question,
            this.currentSettings[this.settingsQuestions[this.questionCount]].answers);
        this.isQuizStart = false;
        this.userScore = 0;
        this.isGameEnd = false;
    }

    setNextQuestion() {
        if (this.questionCount >= this.questions.length - 1) {
            this.isGameEnd = true;
            this.updateQuestion(WIN_MESSAGE + this.userScore, []);
        } else {

            this.questionCount += 1;
            this.updateQuestion(this.questions[this.questionCount].question,
                Object.values(this.questions[this.questionCount].answers));

            let correct = null;
            Object.keys(this.questions[this.questionCount].correct_answers)
                .forEach((e, i) => {
                    if (this.questions[this.questionCount].correct_answers[e] === 'true') {
                        correct = i;
                    }
                });
            this.currentCorrectAnswer = this.currentAnswers[correct];
        }
    }

    increaseUserScore() {
        this.userScore += 1;
    }
}

export default new Quiz();