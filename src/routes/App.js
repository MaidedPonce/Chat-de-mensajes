import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MyFirst from '../components/MyFirst';
import Login from '../containers/Login';

const App = ()  => (
    <BrowserRouter>
    <Route exact path='/my-first' component={MyFirst}/>
    <Route exact path='/login' component={Login}/>
    </BrowserRouter>
)

export default App;