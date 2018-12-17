import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class NumFact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: props.age,
      fact: ""
    };
  }
  componentDidMount() {
    this.getAgeFact();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.age !== this.props.age) {
      this.getAgeFact();
    }
  }

  getAgeFact = () => {
    const age = this.props.age;
    const self = this;
    const dflt = "na";
    const url = `http://numbersapi.com/${age}?default=${dflt}`;

    if (parseInt(age) > 0) {
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
            age,
            fact: result
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    if(this.state.fact.length > 0) {
      return <React.Fragment>
        <p><b>Here some fact about your age:</b> {this.state.fact}</p>
      </React.Fragment>;
    } else {
      return (null);
    }
  }
}

NumFact.propTypes = {
  age: PropTypes.number
};

export default NumFact;