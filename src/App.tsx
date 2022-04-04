import React, {useState} from 'react';
import {gsap} from 'gsap';
import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionCard';
import BackDrop from "./components/BackDrop";
// Types
import { QuestionState ,Difficulty } from './API';
//Style
import "./style/App.css";
//Bootstrap
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';



export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;

const  App = () =>{
  const [loading, setloading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  
  const startTrivia = async () =>{
    setloading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    // need error handling 
    setQuestions(newQuestions);
    setScore(0)
    setUserAnswers([])
    setNumber(0);
    setloading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(!gameOver){
      //Users answer
      const answer = e.currentTarget.value;
      //Check answer against correct answer 
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if(correct) setScore(prev => prev +1 );
      //Save answer in the array for user_answers
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    //Move on to the next question if not the last question
    const nextQuestion = number +1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }

  }
  return (
    <div className="App">
      <div className="appTop">
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
            <Button variant="primary" className='start' onClick={startTrivia}>Start</Button>
        ): null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions.....</p> : null}
        {!loading && !gameOver && (
          <QuestionCard  questionNum={number +1} 
          totalQuestions={TOTAL_QUESTIONS} 
          question={questions[number].question} 
          answers={questions[number].answers} 
          userAnswer={userAnswers? userAnswers[number] : undefined} 
          callback={checkAnswer} />
        )}
        {!gameOver && !loading && userAnswers.length === number +1 && number !== TOTAL_QUESTIONS - 1 ? (
          <Button className='next' onClick={nextQuestion}>Next Question</Button>
        ): null}
      </div>
      <div className='appBtn'>
        <BackDrop difficulty={Difficulty.EASY} totalQuestions={TOTAL_QUESTIONS} />
      </div>
    </div>
  );
}

export default App;
