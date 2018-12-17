import React from 'react';
import db from '../db';
import Login from '../components/Login';

class Cards extends React.Component {
  state = {
    uid: null,
    cards: {},
  };

  componentDidMount() {
  }

  renderCardLink = (key) => {
    const cardLink = `card/${this.state.cards[key]}`;
    const editLink = `edit/${this.state.cards[key]}`;
    return <tr key={key}>
      <td>
        <a href={cardLink}>{this.state.cards[key]}</a>
      </td>
      <td>
        <a href={editLink}>edit</a>
      </td>
    </tr>;
  };

  setUid = (uid) => {
    this.setState({
      uid: uid
    }, this.syncWithDb);
  };

  syncWithDb = () => {
    db.syncState(`owners/${this.state.uid}`, {
      context: this,
      state: 'cards'
    });
  };

  render() {
    const cardsKeys = Object.keys(this.state.cards);
    let Result = "";
    if(this.state.uid == null) {
      Result = <React.Fragment>
        <h1>Log in please to manage your cards</h1>
      </React.Fragment>;
    } else {
      Result = <React.Fragment>
        <h1>No cards found</h1>
        <a href="">Try to add one for the beginning?</a>
      </React.Fragment>;
      if (cardsKeys.length > 0) {
        Result = <React.Fragment>
          <h1>Your cards</h1>
          <table className="table table-striped table-hover">
            <tbody>
              {cardsKeys.map(this.renderCardLink)}
            </tbody>
          </table>
        </React.Fragment>;
      }
    }
    return <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {Result}
            <Login setUid={this.setUid}/>
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

export default Cards;