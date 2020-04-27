import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Login from "../components/Login";
import CardForm from "../components/CardForm";
import { randomId } from "../helpers";
import db from "../db";
import { ICard } from "../interfaces";

interface ICardDataToSave extends ICard {
  owner?: string | null;
}

interface ILastError {
  hasError: boolean;
  errorMessage: string;
}

const Intro = () => {
  const history = useHistory();
  const defaultUid = "anonym";
  const [uid, setUid] = useState<string | null>(defaultUid);
  const [lastError, setLastError] = useState<ILastError>({
    hasError: false,
    errorMessage: ""
  });

  const saveCard = (cardData: ICard) => {
    const cardDataToSave: ICardDataToSave = cardData;
    const cardId = randomId();
    cardDataToSave.owner = uid;
    db.post(`cards/${cardId}`, {
      data: cardData
    })
      .then(() => {
        db.push(`owners/${uid}`, {
          data: [cardId]
        })
          .then(() => {
            history.push(`card/${cardId}`);
          })
          .catch(error => {
            setLastError({
              hasError: true,
              errorMessage: `Can't save owner's data: ${error}`
            });
          });
      })
      .catch(error => {
        setLastError({
          hasError: true,
          errorMessage: `Can't save card data: ${error}`
        });
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 text-center">
            <h2>Create a birthday card in one click</h2>
            <h3>
              With a Pic Of The Day from NASA and fun fact about an age and date
            </h3>
            <CardForm
              age={0}
              birthday={new Date()}
              name=""
              from="Anonym"
              text="Happy birthday!"
              button="Create card!"
              saveCard={saveCard}
              error={lastError["errorMessage"]}
            />
          </div>
          <div className="col-md-6 col-md-offset-3">
            <Login setUid={setUid} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
