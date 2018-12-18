import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class DateFact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      fact: ""
    };
  }

  componentDidMount() {
    this.getDateFact();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date !== this.props.date) {
      this.getDateFact();
    }
  }

  getDateFact = () => {
    const date = this.props.date;
    const self = this;
    const dflt = "na";
    const url = `http://numbersapi.com/${date.getUTCMonth() + 1}/${date.getUTCDate()}/date?default=${dflt}`;

    Axios.request(
      {
        url,
        method: 'get',
      }
    )
      .then((response) => {
        let result = `${response["data"]}`;
        if (result === dflt) {
          result = "";
        }
        self.setState({
          date,
          fact: result
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    if (this.state.fact.length > 0) {
      return <React.Fragment>
        <p><b>Did you know,</b> {this.state.fact}</p>
      </React.Fragment>;
    }
    return (null);
  }
}

DateFact.propTypes = {
  date: PropTypes.object
};

export default DateFact;