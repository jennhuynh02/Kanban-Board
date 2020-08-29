import React from 'react';
import './App.css';
import Board from '../src/components/board/board';

function App() {
  return (
    <div className="App">
      <header className="App-header">Kanban Board</header>
      <Board/>
    </div>
  );
}

export default App;
