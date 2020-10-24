import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./QuestionsContainer.css";
import QuestionsTitle from "./QuestionsTitle";
import InputAnswer from "./InputAnswer";
import InputSubmit from "../componant/InputSubmit";
import ScoreBord from "./ScoreBord";
import useFetch from "../utilities/useFetch";
import right from "../img/right.gif";
import losGif from "../img/wrongAnswer.gif";
import winPhoto from "../img/win.gif";
import wrongAnswerPhoto from "../img/wrong.gif";

const QuestionsContainer = ({ match }) => {
  const quiz = useHistory();

  const [getQuestionsData, setQuestionsData] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [win, setWin] = useState("");
  const [gifCorrect, setGifCorrect] = useState(false);
  const [gifWrong, setGifWrong] = useState(false);

  //hooks
  const { uid } = useParams();
  const { isLoading, error, sendRequest } = useFetch();

  const fetchQuestion = async (url) => {
    const data = await sendRequest(url);
    setQuestionsData(data);
  };

  const postQuestion = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/get-answer`;

    const body = {
      _id: getQuestionsData[questionIndex]._id,
      num: getQuestionsData[questionIndex].Number,
      answer,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
    let getAnswer;
    try {
      getAnswer = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
    } catch (err) {
      console.log("request not send", err);
    }

    if (getAnswer.answer === true) {
      setCorrect(correct + 1);
      setGifCorrect(true);
      setQuestionIndex(questionIndex + 1);
    } else {
      setWrong(wrong + 1);
      setGifWrong(true);
      if (wrong === 2) {
        setGameOver(true);
      }
    }
  };

  const postPlayerScor = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/players-score`;

    const body = {
      _id: match.params.uid,
      finalScore: win,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    };
    let x;
    try {
      x = await sendRequest(url, request.method, request.body, request.headers);
    } catch (err) {
      console.log("Could not update player!", err);
    }
  };

  useEffect(() => {
    if (questionIndex === getQuestionsData.length - 1) {
      setGameOver(true);
      postPlayerScor();
    } else {
      fetchQuestion(`${process.env.REACT_APP_BACKEND_URL}/questions`);
    }
  }, [questionIndex]);

  useEffect(() => {
    setTimeout(() => {
      setGifCorrect(false);
      setGifWrong(false);
    }, 1300);
  }, [correct, wrong]);

  const changeHandler = (e) => {
    setAnswer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postQuestion();
    addScore();
    setAnswer("");
  };

  const restartHnadler = () => {
    setQuestionIndex(0);
    setGameOver(false);
    setCorrect(0);
    setWrong(0);
    quiz.push(`/`);
  };

  const addScore = () => {
    if (correct > wrong) {
      setWin("You Win");
    } else {
      setWin("You Lose");
    }
  };

  return (
    <div className="main">
      <div className="container">
        {isLoading && <div>LOADING ... </div>}

        {error && <div>SORRY SOMETHING WENT WRONG ... </div>}

        {gifCorrect && <img src={right} alt="correct" />}

        {gifWrong && <img src={wrongAnswerPhoto} alt="wrong" />}

        {!gifCorrect && !gifWrong && gameOver ? (
          <ScoreBord
            onclick={restartHnadler}
            scor={win}
            correct={correct}
            wrong={wrong}
          />
        ) : (
          getQuestionsData.length &&
          !gifCorrect &&
          !gifWrong && (
            <>
              <h1>
                Question {getQuestionsData[questionIndex].num} /{" "}
                {getQuestionsData.length}
              </h1>
              <p>What is the result :</p>
              <div className="questions_container">
                <QuestionsTitle
                  questionText={getQuestionsData[questionIndex].question}
                />
                <InputAnswer onChange={changeHandler} value={answer} />
              </div>
              <InputSubmit onclick={submitHandler} />
            </>
          )
        )}
      </div>
      <div className="gif_container">
        {correct > wrong && gameOver && !gifWrong && !gifWrong && (
          <img src={winPhoto} alt="win" />
        )}
        {correct < wrong && gameOver && !gifWrong && !gifCorrect && (
          <img src={losGif} alt="win" />
        )}
      </div>
    </div>
  );
};

export default QuestionsContainer;
