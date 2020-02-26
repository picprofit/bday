import React, { useState, useEffect } from "react";
import NumFact from "../components/NumFact";
import DateFact from "../components/DateFact";
import NasaPicOfTheDay from "../components/NasaPicOfTheDay";
import db from "../db";
import NotFound from "./App";

const Card = props => {
  const [loading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const [cardData, setCardData] = useState({
    age: 0,
    birthday: new Date(),
    name: "",
    from: "",
    text: ""
  });

  useEffect(() => {
    const cardId = props.match.params.cardId;
    db.fetch(`cards/${cardId}`, {
      // context: this, ?
      then(data) {
        //check for empty
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          setError(true);
        } else {
          setCardData({
            birthday: new Date(data.birthday),
            age: data.age,
            name: data.name,
            from: data.from,
            text: data.text
          });
          setError(false);
        }
        setLoading(false);
      }
    });
  }, []);

  const happyBirthday = age => {
    return age > 0 ? (
      <>
        Happy <b>{age}</b> birthday!
      </>
    ) : (
      <>Happy birthday!</>
    );
  };

  const handleOpen = () => {
    const card = document.getElementById("card");
    let timer = null;
    card.setAttribute("class", "open-half");
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
      card.setAttribute("class", "open-fully");
      timer = null;
    }, 1000);
  };

  if (!loading && !hasError) {
    return <NotFound text="Card not found" />;
  }
  const from =
    cardData["from"].length > 0 ? (
      <p className="signed text-right">From {cardData["from"]}</p>
    ) : (
      ""
    );
  if (!loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="card">
              <div id="card-inside">
                <div className="wrap">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <h1>{cardData["name"]}</h1>
                        <h2>{happyBirthday(props.age)}</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p>{cardData["text"]}</p>
                        <NumFact age={cardData["age"]} />
                        <DateFact date={cardData["birthday"]} />
                        <NasaPicOfTheDay date={cardData["birthday"]} />
                      </div>
                    </div>
                  </div>
                  {from}
                </div>
              </div>

              <div id="card-front">
                <div className="wrap">
                  <h1>{happyBirthday(props.age)}</h1>
                  <div className="button-wrap">
                    <button id="open" onClick={handleOpen}>
                      Click me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 text-center">
            <div id="card">
              <div id="card-front">
                <div className="wrap">
                  <h1>{happyBirthday(props.age)}</h1>
                  <h2>loading...</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
