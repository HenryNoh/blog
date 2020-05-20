import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { List, Write } from './index.js'; 
import { Right_Write } from './right/index.js'; 
import './main.css';

class main extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
        <div className='Mains'>
        <div id='Mains-left'>
        </div>

        <div>
            <Route path='/' component={List} exact/>
            <Route path='/write' component={Write} />
        </div>

        <div id='Mains-right'>
            <Route path='/write' component={Right_Write} />
        </div>
      </div>
    );
  }
}

export default main;