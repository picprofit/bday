import React, { useState, useEffect } from "react";
import Axios from "axios";

interface IDateFact {
    date: Date;
}

const DateFact: React.FC<IDateFact> = ({ date: initialDate }) => {
  const [date, setDate] = useState(initialDate);
  const [fact, setFact] = useState("");

  useEffect(() => {
    getDateFact(date);
  }, [date]);

  const getDateFact = (date: Date) => {
    const dflt = "na";
    const url = `http://numbersapi.com/${date.getUTCMonth() +
      1}/${date.getUTCDate()}/date?default=${dflt}`;

    Axios.request({
      url,
      method: "get"
    })
      .then(response => {
        const result = response["data"] !== dflt ? response["data"] : "";
        setDate(date);
        setFact(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return fact.length > 0 ? (
    <>
      <p>
        <b>Did you know,</b> {fact}
      </p>
    </>
  ) : null;
};

export default DateFact;
