import React from 'react';
import ReactDOM from 'react-dom';
import GameControl from './GameControl';

it('renders GameControl without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GameControl />, div);
});
