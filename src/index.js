import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'animate.css/animate.min.css'
import './index.css';

const root = ReactDOM.createRoot( document.querySelector('#root'));
root.render(<App/>);
