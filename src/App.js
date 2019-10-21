import React, { Component } from 'react';

import initReactFastclick from 'react-fastclick';

import AppRouter from "./router";

initReactFastclick();

class App extends Component {

  render() {
    return (
      <AppRouter />
    );
  }
}

export default App;
