import React, { useEffect, useState } from "react";
import useFetch from "../utilities/useFetch";
import ScoerTable from "../componant/ScoerTable";
import "./scores.css";

const Scores = () => {
  const { isLoading, error, sendRequest } = useFetch();

  const url = "http://localhost:5000/api/player-score";

  const [list, setList] = useState([]);

  const playerList = async () => {
    const players = await sendRequest(url);
    setList(players);
  };

  useEffect(() => {
    playerList();
  }, []);

  console.log(list);

  return (
    <div className="main_score">
      {isLoading && <div>Loadin ....</div>}
      {error && <div> ERROR .... SORRY</div>}
      {!isLoading &&
        !error &&
        list
          .reverse()
          .map((item) => (
            <ScoerTable
              win={item.finalScore === "You Win" ? "win" : "los"}
              names={!item.name ? "Player" : item.name}
              scoer={!item.finalScore ? "no score fond" : item.finalScore}
            />
          ))}
    </div>
  );
};

export default Scores;
