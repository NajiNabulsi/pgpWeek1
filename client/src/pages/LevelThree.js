import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import QuestionsTitle from "../componant/QuestionsTitle";
import InputAnswer from "../componant/InputAnswer";
import InputSubmit from "../componant/InputSubmit";
import ScoreBord from "../componant/ScoreBord";
import useFetch from "../utilities/useFetch";
import right from "../img/right.gif";
import losGif from "../img/wrongAnswer.gif";
import winPhoto from "../img/win.gif";
import wrongAnswerPhoto from "../img/wrong.gif";
import Counter from "../componant/Counter";
import timeUp from "../img/time Up.jpg";

const LevelThree = () => {
  const history = useHistory();
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
  const [showCountDown, setShowCountDown] = useState(false);
  const [start, setStart] = useState(false);

  const urlLevlThree = "http://localhost:5000/api/three-two";
  const urlGetAnswer = "http://localhost:5000/api/levelthree-answer";

  const input = useRef();
  const { isLoading, error, clearError, sendRequest } = useFetch();

  const fetchQuestion = async (url) => {
    const data = await sendRequest(url);
    setQuestionsData(data);
    setStart(true);
  };

  const postQuestion = async () => {
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
        urlGetAnswer,
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
    fetchQuestion(urlLevlThree);
  }, [questionIndex]);

  useEffect(() => {
    setTimeout(() => {
      setGifCorrect(false);
      setGifWrong(false);
      // setStart(true);
    }, 1300);
  }, [correct, wrong]);

  const tim = (t) => {
    let x;
    if (t === true) {
      x = setTimeout(() => {
        setShowCountDown(true);
      }, 15000);
    } else {
      clearTimeout(x);
    }
  };

  useEffect(() => {
    tim(start);
  }, [start]);

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
    // setStart(false);
    postQuestion();
    if (questionIndex === getQuestionsData.length - 1) {
      setGameOver(true);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
    score(questionIndex);
    addScore();
    setAnswer("");
  };

  const restartHnadler = () => {
    history.push("/");
  };

  const addScore = () => {
    if (correct > wrong) {
      setWin("You Win");
    } else {
      setWin("You Lose");
    }
  };
  console.log("getQuestionsData", getQuestionsData);
  return (
    <div className="main">
      {!gameOver && !showCountDown && <Counter />}
      <div className="container">
        {isLoading && <div>LOADING ... </div>}

        {error && <div>SORRY SOMETHING WENT WRONG ... </div>}
        {showCountDown && !gameOver && (
          <img src={timeUp} alt="time up" onClick={restartHnadler} />
        )}

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
          !gifWrong &&
          !showCountDown && (
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

export default LevelThree;
