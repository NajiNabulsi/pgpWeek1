import React, { useState } from "react";
import InputName from "../componant/InputName";
import useFetch from "../utilities/useFetch";
import { useHistory } from "react-router-dom";
import OptionBox from "../componant/OptionBox";
import "./home.css";
import Card from "../componant/Card";

const Home = () => {
  const quiz = useHistory();
  const { isLoading, error, clearError, sendRequest } = useFetch();

  const [input, setInput] = useState();
  const [player, setPlayer] = useState();
  const [level, setLevel] = useState("one");

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/player";
    const body = {
      name: input,
    };

    const request = {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };
    let play;
    try {
      play = await sendRequest(
        url,
        request.method,
        request.body,
        request.headers
      );
    } catch (err) {
      console.log("request not send", err);
    }
    setPlayer(play);
    if (play) {
      return quiz.push(`/${level}/:${play.id}`);
    }
    // return;
  };

  const levelOneChecked = (e) => {
    setLevel(e.target.value);
  };

  return (
    <Card>
      <form className="fom-home">
        {isLoading && <div>LODING...</div>}
        {error && <div>Sorry...</div>}
        <InputName onChange={changeHandler} />
        <OptionBox levelOneChecked={levelOneChecked} />
        <button type="submit" onClick={clickHandler}>
          Start
        </button>
      </form>
    </Card>
  );
};

export default Home;
