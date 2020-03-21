import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LocationState } from "history";

import Login from "../components/Login";
import CardForm from "../components/CardForm";
import db from "../db";
import { ICard } from "../interfaces";

interface IStatus {
  loaded: boolean;
  saved: boolean;
}

interface ICardDb extends ICard {
  owner: string;
}

const EditCard = () => {
  const [uid, setUid] = useState<string>("");
  const [card, setCard] = useState<ICardDb>({
    age: 0,
    birthday: new Date(),
    name: "",
    from: "",
    text: "",
    owner: ""
  });

  const [status, setStatus] = useState<IStatus>({
    loaded: false,
    saved: false
  });

  const params: any = useParams();
  const { cardId } = params;

  useEffect(() => {
    db.syncState(`cards/${cardId}`, {
      context: {
        setState: ({ card }: { card: ICardDb }) => setCard({ ...card }),
        state: { card }
      },
      state: "card",
      then: () => {
        setStatus({ ...status, loaded: true });
      }
    });
  }, [cardId]);

  const saveCard = (cardData: ICard) => {
    setStatus({
      ...status,
      saved: false
    });
    db.post(`cards/${cardId}`, {
      data: { ...cardData, owner: uid }
    }).then(() => {
      setStatus({
        ...status,
        saved: true
      });
    });
  };

  const birthdayDate = new Date(card.birthday);
  // if (status.loaded) {
  let result = null;
  if (uid === card.owner) {
    result = (
      <>
        <CardForm
          age={card.age}
          birthday={birthdayDate}
          name={card.name}
          from={card.from}
          text={card.text}
          button="Save card!"
          saveCard={saveCard}
          error=""
        />
        {status.saved && (
          <div className="alert alert-success" role="alert">
            Card saved. <a href={`card/${cardId}`}>View card</a>
          </div>
        )}
      </>
    );
  } else {
    result = (
      <>
        <p>Sorry, you can't edit this card</p>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1>Edit card</h1>
            {!status.loaded ? "...loading" : result}
            <Login setUid={setUid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCard;
