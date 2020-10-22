import React, { useRef, useState, useEffect } from "react";
import "./QuestionsContainer.css";
import QuestionsTitle from "./QuestionsTitle";
import InputAnswer from "./InputAnswer";
// import getQuestionsData from "../dumData.json";
import InputSubmit from "../componant/InputSubmit";
import ScoreBord from "./ScoreBord";
import useFetch from "../utilities/useFetch";
import right from "../img/right.gif";
import losGif from "../img/wrongAnswer.gif";
import winPhoto from "../img/win.gif";
import wrongAnswerPhoto from "../img/wrong.gif";

const QuestionsContainer = () => {
  const [getQuestionsData, setQuestionsData] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [win, setWin] = useState("");
  const [los, setLos] = useState("");
  const [gifCorrect, setGifCorrect] = useState(false);
  const [gifWrong, setGifWrong] = useState(false);

  const input = useRef();
  const { isLoading, error, clearError, sendRequest } = useFetch();

  const fetchQuestion = async (url) => {
    const data = await sendRequest(url);
    setQuestionsData(data);
  };

  const postQuestion = async () => {
    const url = "http://localhost:5000/api/get-answer";

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
    } else {
      setWrong(wrong + 1);
      setGifWrong(true);
    }
  };
  useEffect(() => {
    fetchQuestion("http://localhost:5000/api/questions");
  }, [questionIndex]);

  useEffect(() => {
    setTimeout(() => {
      setGifCorrect(false);
      setGifWrong(false);
    }, 1300);
  }, [correct, wrong]);

  const score = (num) => {
    if (parseInt(answer) === getQuestionsData[num].answer) {
      setCorrect(correct.scor + 1);
      setGifCorrect(true);
    } else {
      setWrong(wrong + 1);
      setLos(true);
    }
  };
  const changeHandler = (e) => {
    setAnswer(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postQuestion();
    if (questionIndex === getQuestionsData.length - 1) {
      setGameOver(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
    score(questionIndex);
    addScore();
    setAnswer("");
    // input.current.focus();
  };

  const restartHnadler = () => {
    setQuestionIndex(0);
    setGameOver(false);
    setCorrect(0);
    setWrong(0);
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
              <h1>Question{getQuestionsData[questionIndex].Number}</h1>
              <p>What is the result :</p>
              <div className="questions_container">
                <QuestionsTitle
                  questionText={getQuestionsData[questionIndex].question}
                />
                <InputAnswer
                  onChange={changeHandler}
                  value={answer}
                  ref={input}
                />
                {/* <input
                  className="answer"
                  type="text"
                  onChange={changeHandler}
                  value={answer}
                  autoFocus
                  ref={input}
                /> */}
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
