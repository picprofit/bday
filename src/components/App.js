import React from 'react';
import NotFound from '../components/NotFound';
import Card from '../components/Card';
import db from '../db';

import "react-datepicker/dist/react-datepicker.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      age: 0,
      birthday: new Date(),
      name: "",
      from: "",
      text: "",
      loaded: false,
      success: false
    };
  }

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

  render() {
    if (this.state.loaded && !this.state.success) {
      return <NotFound text="Card not found"/>;
    }
    return <Card age={this.state.age} birthday={this.state.birthday} name={this.state.name}
                 from={this.state.from} text={this.state.text} loaded={this.state.loaded}/>;
  }
}

export default App;