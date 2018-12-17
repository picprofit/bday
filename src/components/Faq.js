import React from 'react';

class Faq extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      faq: {
        'What\'s this?': 'Just a birthday card with some facts about target\'s age, birthday date and ' +
        'picture from NASA',
        'For whom?': 'Just for fun and for me to study React',

      }
    };
  }

  render() {
    return <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>FAQ</h1>
            <ul>
            {Object.keys(this.state.faq).map(
              key => <li key={key}><p><b>{key}</b><br/>{this.state.faq[key]}</p></li>
            )}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

export default Faq;