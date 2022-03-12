import axios from 'axios';

const API_KEY = "5vSnU67OpxjdQBxZqCmg0TTuJBSPhpL4pZ8khYjY";

const instance = axios.create({
    baseURL: 'https://quizapi.io/api/v1/',
    headers: {
        'X-Api-Key': API_KEY
    }
});

export const getQuestions = (settings) => instance
    .get(`questions?tags=${settings.category}&difficulty=${settings.difficult}&limit=${settings.limit}`)
    .then((data) => data.data)
    .catch((err) => err.response.status);


