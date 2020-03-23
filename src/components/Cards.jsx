import React, { useState, useEffect } from "react";
import db  from "../db";
import Login from "../components/Login";
import { Link } from "react-router-dom";

const Cards = () => {
  const [uid, setUid] = useState( null);
  const [cards, setCards] = useState( {});

  useEffect(() => {
    if(uid == null) {
      return;
    }
    const ref = db.syncState(`owners/${uid}`, {
      context: {
        setState: ({ cards }) => setCards({ ...cards }),
        state: { cards },
      },
      state: "cards"
    });
    return () => {
      db.removeBinding(ref);
    }
  }, [uid]);

  // useEffect(() => {
  //     if(uid == null) {
  //       return;
  //     }
  //   // Grab reference to the store.
  //   const ref = db.ref(`owners/${uid}`);
  //   // Sync the data.
  //   ref.on('value', snapshot => {
  //     if (snapshot.val())
  //       setCards(snapshot.val());
  //   });
  // }, [uid]);

  const renderCardLink = key => {
    const cardLink = `card/${cards[key]}`;
    const editLink = `edit/${cards[key]}`;
    return (
      <tr key={key}>
        <td>
          <Link to={cardLink}>{cards[key]}</Link>
        </td>
        <td>
          <Link to={editLink}>edit</Link>
        </td>
      </tr>
    );
  };

  const cardsKeys = Object.keys(cards);
  const result =
    uid == null ? (
      <>
        <h1>Log in please to manage your cards</h1>
      </>
    ) : cardsKeys.length > 0 ? (
      <>
        <h1>Your cards</h1>
        <table className="table table-striped table-hover">
          <tbody>{cardsKeys.map(renderCardLink)}</tbody>
        </table>
      </>
    ) : (
      <>
        <h1>No cards found</h1>
        <Link to="/">Try to add one for the beginning?</Link>
      </>
    );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            {result}
            <Login setUid={setUid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
