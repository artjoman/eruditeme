import React from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import Game from './components/Game';


function App() {
  return (
    <div className="App">
      <div>
        <MainMenu/>
        <Game></Game>
      </div>
    </div>
  );
}

export default App;
