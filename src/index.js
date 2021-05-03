import React from 'react';
import ReactDOM from 'react-dom';
import "normalize.css";
import Router from './Router.jsx';
import {LoginModalProvider} from "./LoginModalContext";

ReactDOM.render(
    <React.StrictMode>
        <LoginModalProvider>
            <Router/>
        </LoginModalProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
