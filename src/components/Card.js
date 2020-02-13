import React, {useState} from 'react';
import NumFact from '../components/NumFact';
import DateFact from '../components/DateFact';
import NasaPicOfTheDay from '../components/NasaPicOfTheDay';
import db from "../db";
import NotFound from "./App";

const Card = (props) => {
  const [cardParams, setCardParams] = useState({
    age: 0,
    birthday: new Date(),
    name: "",
    from: "",
    text: "",
    loaded: false,
    success: false
  });

  componentDidMount() {
    const cardId = this.props.match.params.cardId;
    db.fetch(`cards/${cardId}`, {
      context: this,
      then(data){
        //check for empty
        if (Object.keys(data).length === 0 && data.constructor === Object) {
          this.setState({
            loaded: true,
            success: false
          })
        } else {
          this.setState({
            birthday: new Date(data.birthday),
            age: data.age,
            name: data.name,
            from: data.from,
            text: data.text,
            loaded: true,
            success: true
          });
        }
      }
    });
  }

  happyBirthday = () => {
    if (this.props.age > 0) {
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
    if (this.state.loaded && !this.state.success) {
      return <NotFound text="Card not found"/>;
    }
    let from = "";
    if (this.state.from.length > 0) {
      from = <p className="signed text-right">From {this.state.from}</p>;
    }
    if (this.state.loaded) {
      return <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="card">
              <div id="card-inside">
                <div className="wrap">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <h1>{this.state.name}</h1>
                        <h2>{this.happyBirthday()}</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <p>{this.state.text}</p>
                        <NumFact age={this.state.age}/>
                        <DateFact date={this.state.birthday}/>
                        <NasaPicOfTheDay date={this.state.birthday}/>
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

export default Card;