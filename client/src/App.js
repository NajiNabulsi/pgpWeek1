import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

import QuestionsContainer from "./componant/QuestionsContainer";
import Home from "./pages/Home";
import LevelThree from "./pages/LevelThree";
import LevelTwo from "./pages/LevelTwo";
import Scores from "./pages/Scores";

function App() {
  // create routs( Home QuestionsContainer LevelTwo LevelThreescores)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/one/:uid" component={QuestionsContainer} />
          <Route exact path="/two/:uid" component={LevelTwo} />
          <Route exact path="/three/:uid" component={LevelThree} />
          <Route exact path="/score" component={Scores} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
