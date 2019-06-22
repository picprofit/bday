import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import App from '../components/App';

const Router = () => (
  <BrowserRouter basename={'/'}>
    <Route path='/' component={App}/>
  </BrowserRouter>
);

export default Router;