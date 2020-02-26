import React, {useState, useEffect} from 'react';
import Login from '../components/Login';
import CardForm from '../components/CardForm';
import db from '../db';

const EditCard = ({props}) => {
  const [state, setState] = useState({
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
  });

  cardId = props.match.params.cardId;

  useEffect(() => {
    syncWithDb();
  }, [])
  

  const setUid = (uid) => {
    setState({
      uid: uid
    });
  };

  const saveCard = (cardData) => {
    setState({
      saved: false
    });
    cardData.owner = state.uid;
    db.post(`cards/${cardId}`, {
      data: cardData
    }).then(() => {
      setState({
        saved: true
      })
    });
  };

  const syncWithDb = () => {
    db.syncState(`cards/${cardId}`, {
      // context: this,
      state: 'card',
      then: () => {
        setState({loaded: true})
      }
    });
  };

    const birthdayDate = new Date(this.state.card.birthday);
    let result = "...loading";
    if (state.loaded) {
      let msg = "";
      if (state.saved) {
        const cardUrl = `card/${this.cardId}`;
        msg = <div className="alert alert-success" role="alert">
          Card saved. <a href={cardUrl}>View card</a>
        </div>;
      }
      if (state.uid === state.card.owner) {
        result = <>
          <CardForm age={state.card.age} birthday={birthdayDate} name={state.card.name}
                    from={state.card.from} text={state.card.text} button="Save card!"
                    saveCard={saveCard}/>
          {msg}
        </>;
      } else {
        result = <>
          <p>Sorry, you can't edit this card</p>
        </>;
      }


    return <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Edit card</h1>
            {result}
            <Login setUid={setUid}}/>
          </div>
        </div>
      </div>
    </>;
  }
}

export default EditCard;