import React, { useState, useEffect } from "react";
import db from "../db";
import Login from "../components/Login";
import { Link } from "react-router-dom";

const Cards = () => {
  const [uid, setUid] = useState( null);
  const [cards, setCards] = useState( {});

  useEffect(() => {
    // db.syncState(`owners/${state.uid}`, {
    //   //context: this, TODO
    //   state: "cards"
    // });

    // console.log(state);
    const ref = db.syncState(`owners/${uid}`, {
      context: {
        setCards,
        state,
      },
      state: "cards"
    });
    console.log(cards);
    return () => {
      db.removeBinding(ref);
    }
  }, []);

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

  console.log("cards");
  console.log(cards);
  const cardsKeys = Object.keys(cards);
  const Result =
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
            {Result}
            <Login setUid={setUid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
