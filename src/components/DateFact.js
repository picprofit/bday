import React, { useState, useEffect } from "react";
import Axios from "axios";
import PropTypes from "prop-types";

const DateFact = ({ date }) => {
  const [state, setState] = useState({
    date: date,
    fact: ""
  });

  useEffect(() => {
    getDateFact(date);
  }, [date]);

  const getDateFact = date => {
    const self = this;
    const dflt = "na";
    const url = `http://numbersapi.com/${date.getUTCMonth() +
      1}/${date.getUTCDate()}/date?default=${dflt}`;

    Axios.request({
      url,
      method: "get"
    })
      .then(response => {
        let result = `${response["data"]}`;
        if (result === dflt) {
          result = "";
        }
        setState({
          date,
          fact: result
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return state.fact.length > 0 ? (
    <>
      <p>
        <b>Did you know,</b> {state.fact}
      </p>
    </>
  ) : null;
};

DateFact.propTypes = {
  date: PropTypes.object
};

export default DateFact;
