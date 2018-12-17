import React from 'react';
import NumFact from '../components/NumFact';
import DateFact from '../components/DateFact';
import NasaPicOfTheDay from '../components/NasaPicOfTheDay';
import PropTypes from 'prop-types';

class Card extends React.Component {
  happyBirthday = () => {
    if(this.props.age > 0) {
      return (<React.Fragment>Happy <b>{this.props.age}</b> birthday!</React.Fragment>);
    }
    else return (<React.Fragment>Happy birthday!</React.Fragment>);
  };

  handleOpen = () => {
    const card = document.getElementById("card");
    let timer = null;
    card.setAttribute('class', 'open-half');
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        card.setAttribute('class', 'open-fully');
        timer = null;
      }, 1000);
  };

  render() {
    let from = "";
    if(this.props.from.length > 0) {
      from = <p className="signed text-right">From {this.props.from}</p>;
    }
    if(this.props.loaded) {
      return <div className="container"><div className="row"><div className="col-md-12">
        <div id="card">
          <div id="card-inside">
            <div className="wrap">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1>{this.props.name}</h1>
                    <h2>{this.happyBirthday()}</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <p>{this.props.text}</p>
                    <NumFact age={this.props.age} />
                    <DateFact date={this.props.birthday} />
                    <NasaPicOfTheDay date={this.props.birthday} />
                  </div>
                </div>
              </div>
              {from}
            </div>
          </div>

          <div id="card-front">
            <div className="wrap">
              <h1>{this.happyBirthday()}</h1>
              <div className="button-wrap">
                <button id="open" onClick={this.handleOpen}>Click me</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
    } else {
      return <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 text-center">
              <div id="card">
                <div id="card-front">
                  <div className="wrap">
                    <h1>{this.happyBirthday()}</h1>
                    <h2>loading...</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    }
  }
}

Card.propTypes = {
  age: PropTypes.number,
  birthday: PropTypes.object,
  name: PropTypes.string,
  from: PropTypes.string,
  text: PropTypes.string,
  loaded: PropTypes.bool,
};

export default Card;