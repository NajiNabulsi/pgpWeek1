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

function App() {
  // create routs( Home QuestionsContainer LevelTwo LevelThreescores)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:uid/one" component={QuestionsContainer} />
          <Route exact path="/:uid/two" component={LevelTwo} />
          <Route exact path="/:uid/three" component={LevelThree} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
