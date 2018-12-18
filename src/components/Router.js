import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from '../components/App';
import Intro from '../components/Intro';
import Faq from '../components/Faq';
import Cards from '../components/Cards';
import EditCard from '../components/EditCard';
import NotFound from '../components/NotFound';

const Router = () => (
  <BrowserRouter basename={'/bday'}>
    <Switch>
      <Route exact path="/" component={Intro}/>
      <Route exact path="/faq" component={Faq}/>
      <Route exact path="/cards/" component={Cards}/>
      <Route path="/card/:cardId" component={App}/>
      <Route path="/edit/:cardId" component={EditCard}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default Router;