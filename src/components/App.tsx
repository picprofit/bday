import React from 'react';
import NotFound from '../components/NotFound';
import Card from '../components/Card';

import "react-datepicker/dist/react-datepicker.css";
import { Route, Switch } from "react-router-dom";
import Intro from "./Intro";
import Faq from "./Faq";
import Cards from "./Cards";
import EditCard from "./EditCard";
import Footer from './Footer';

class App extends React.Component {


  render() {
    return <React.Fragment>
      <Switch>
        <Route exact path="/" component={Intro}/>
        <Route exact path="/faq" component={Faq}/>
        <Route exact path="/cards/" component={Cards}/>
        <Route path="/card/:cardId" component={Card}/>
        <Route path="/edit/:cardId" component={EditCard}/>
        <Route component={NotFound}/>
      </Switch>
      <Footer/>
    </React.Fragment>;
  }
}

export default App;