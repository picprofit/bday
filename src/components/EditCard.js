import React from 'react';
import Login from '../components/Login';
import CardForm from '../components/CardForm';
import db from '../db';

class EditCard extends React.Component {
  state = {
    uid: null,
    card: {
      age: 0,
      birthday: new Date(),
      name: "",
      from: "",
      text: ""
    },
    loaded: false,
    saved: false
  };

  cardId = this.props.match.params.cardId;

  componentDidMount() {
    this.syncWithDb();
  }

  setUid = (uid) => {
    this.setState({
      uid: uid
    });
  };

  saveCard = (cardData) => {
    this.setState({
      saved: false
    });
    cardData.owner = this.state.uid;
    db.post(`cards/${this.cardId}`, {
      data: cardData
    }).then(() => {
      this.setState({
        saved: true
      })
    });
  };

  syncWithDb = () => {
    db.syncState(`cards/${this.cardId}`, {
      context: this,
      state: 'card',
      then: () => {
        this.setState({loaded: true})
      }
    });
  };

  render() {
    const birthdayDate = new Date(this.state.card.birthday);
    let result = "...loading";
    if (this.state.loaded) {
      let msg = "";
      if (this.state.saved) {
        const cardUrl = `/card/${this.cardId}`;
        msg = <div className="alert alert-success" role="alert">
          Card saved. <a href={cardUrl}>View card</a>
        </div>;
      }
      if (this.state.uid === this.state.card.owner) {
        result = <React.Fragment>
          <CardForm age={this.state.card.age} birthday={birthdayDate}
                    name={this.state.card.name} from={this.state.card.from}
                    text={this.state.card.text} button="Save card!"
                    saveCard={this.saveCard}/>
          {msg}
        </React.Fragment>;
      } else {
        result = <React.Fragment>
          <p>Sorry, you can't edit this card</p>
        </React.Fragment>;
      }
    }


    return <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Edit card</h1>
            {result}
            <Login setUid={this.setUid}/>
          </div>
        </div>
      </div>
    </React.Fragment>;
  }
}

export default EditCard;