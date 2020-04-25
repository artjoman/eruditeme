import React from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import Game from './components/Game';
import EditQuestions from './components/questionMaster/EditQuestions';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/edit" component={EditQuestions} />
            <Route path="/game" component={Game} />
            <Route path="/lobby" component={Game} />
            <Route path="/" component={MainMenu} />

          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
