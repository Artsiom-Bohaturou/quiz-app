import Header from './components/Header/Header';
import Quiz from './components/Quiz/Quiz';
import styles from './css/App.module.scss';
import quizSettings from './store/quiz';

const App = () => {

  return (
    <div className={styles.App}>
      <Header />
      <Quiz quizSettings={quizSettings} />
    </div>
  );
}

export default App;
