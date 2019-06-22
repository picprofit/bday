import React from 'react';
import Login from '../components/Login';
import CardForm from '../components/CardForm';
import {randomId} from '../helpers';
import db from '../db';

class Intro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.defaultUid,
      lastError: ''
    };
  }

  defaultUid = "anonym";

  setUid = (uid) => {
    this.setState({
      uid: uid || this.defaultUid
    });
  };

  saveCard = (cardData) => {
    const cardId = randomId();
    let lastError = '';
    cardData.owner = this.state.uid;
    db.post(`cards/${cardId}`, {
      data: cardData
    }).then(() => {
      db.push(`owners/${this.state.uid}`, {
        data: [
          cardId
        ]
      }).then(() => {
        this.props.history.push(`card/${cardId}`);
      }).catch(error => {
        lastError = 'Can\'t save owner\'s data';
        this.setState({lastError});
        console.log(lastError);
        console.log(error);
      });
    }).catch(error => {
      lastError = 'Can\'t save card data';
      this.setState({lastError});
      console.log(lastError);
      console.log(error);
    });
  };

  render() {
    return <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h2>Create a birthday card in one click</h2>
            <h3>With a Pic Of The Day from NASA and fun fact about an age and date</h3>
            <CardForm age="0" birthday={new Date()} name="" from="Anonym" text="Happy birthday!"
                      button="Create card!" saveCard={this.saveCard} lastError={this.state.lastError}/>
          </div>
          <div className="col-md-6 col-md-offset-3">
            <Login setUid={this.setUid}/>
          </div>
        </div>
      </div>
    </React.Fragment>;
  }
}

export default Intro;