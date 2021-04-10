import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import * as serviceWorker from './serviceWorker';
import {Application} from "./app";


ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
