import React from 'react';
import './App.css';
import List from './components/List';
import EditQuestions from './components/questionMaster/editQuestions';

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/edit" component={EditQuestions} />
            <Route path="/" component={List} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
