import React, { useState } from "react";
import Login from "../components/Login";
import CardForm from "../components/CardForm";
import { randomId } from "../helpers";
import db from "../db";

const Intro = props => {
  const defaultUid = "anonym";
  const [uid, setUid] = useState(defaultUid);
  const [lastError, setLastError] = useState({
    hasError: false,
    errorMessage: ""
  });

  const saveCard = cardData => {
    const cardId = randomId();
    cardData.owner = uid;
    db.post(`cards/${cardId}`, {
      data: cardData
    })
      .then(() => {
        db.push(`owners/${uid}`, {
          data: [cardId]
        })
          .then(() => {
            props.history.push(`card/${cardId}`);
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
              age="0"
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
