import React, { Component } from 'react';
import './App.css';
import { Main } from './page/index.js';
import { Head } from './inc'

class App extends Component {
  render() {
    return(
      <div className='App'>
        <div className='Main_wrapper'>
          <Head/>
          <Main/>
        </div>
      </div>

    )

  }
}

export default App;