import React, { useState } from "react";
import InputName from "../componant/InputName";
import useFetch from "../utilities/useFetch";
import { useHistory } from "react-router-dom";
import OptionBox from "../componant/OptionBox";
import "./home.css";
import Card from "../componant/Card";

const Home = () => {
  const quiz = useHistory();
  const { isLoading, error, sendRequest } = useFetch();

  const [input, setInput] = useState();
  const [player, setPlayer] = useState();
  const [level, setLevel] = useState("one");

  const changeHandler = (e) => {
    setInput(e.target.value);
  };

  const clickHandler = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BACKEND_URL}/player`;
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
      return quiz.push(`/${level}/${play.id}`);
    }
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
        <div className="buttons">
          <button type="submit" onClick={clickHandler}>
            Start
          </button>
          <button onClick={() => quiz.push(`/score`)}>Scoues pag</button>
        </div>
      </form>
    </Card>
  );
};

export default Home;
