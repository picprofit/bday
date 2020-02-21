import React, { useState } from 'react';
import db from '../db';
import Login from '../components/Login';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [state, setState] = useState({
    uid: null,
    cards: {},
  });

 const renderCardLink = (key) => {
    const cardLink = `card/${state.cards[key]}`;
    const editLink = `edit/${state.cards[key]}`;
    return <tr key={key}>
      <td>
        <Link to={cardLink}>{state.cards[key]}</Link>
      </td>
      <td>
        <Link to={editLink}>edit</Link>
      </td>
    </tr>;
  };

  setUid = (uid) => {
    setState({
      uid: uid
    }, this.syncWithDb);
  };

  syncWithDb = () => {
    db.syncState(`owners/${this.state.uid}`, {
      //context: this, TODO
      state: 'cards'
    });
  };

  render() {
    const cardsKeys = Object.keys(state.cards);
    const Result = this.state.uid == null ? <>
        <h1>Log in please to manage your cards</h1>
      </> : 
      cardsKeys.length > 0 ? 
      <>
                <h1>Your cards</h1>
                <table className="table table-striped table-hover">
                  <tbody>
                  {cardsKeys.map(renderCardLink)}
                  </tbody>
                </table>
              </>
              :
      <>
        <h1>No cards found</h1>
        <Link to='/'>
        Try to add one for the beginning?
        </Link>
      </>;
    }
    return <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {Result}
            <Login setUid={setUid}/>
          </div>
        </div>
      </div>
    </>
  }
}

export default Cards;