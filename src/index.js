import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import GameControl from './GameControl';
import './index.css';

ReactDOM.render(
  <Header />,
  document.getElementById('header')
);

ReactDOM.render(
  <GameControl />,
  document.getElementById('root')
);
