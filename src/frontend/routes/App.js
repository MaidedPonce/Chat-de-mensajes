import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from '../containers/Login';
import Home from '../containers/Home'
import '../assets/styles/App.scss';

const App = ()  => (
    <BrowserRouter>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/home' component={Home} />
    </BrowserRouter>
)

export default App;