import React from 'react';
import ReactDOM from 'react-dom';
import Inputs from './Inputs';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Inputs />, div);
  ReactDOM.unmountComponentAtNode(div);
});
