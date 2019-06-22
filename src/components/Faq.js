import React from 'react';

class Faq extends React.Component {
  faq = {
        'What\'s this?': `Just a birthday card with some facts about target's age, birthday date 
        and picture from NASA`,
        'For whom?': `Just for fun and for me to study React`,
        'Can i see the code?': `Sure, here's the 
<a href="https://github.com/picprofit/bday" target="_blank" rel='noopener noreferrer'>Github repo</a>`,
      };

  render() {
    return <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>FAQ</h1>
            <ul>
              {Object.keys(this.faq).map(
                key => <li key={key}><p><b>{key}</b><br/><span dangerouslySetInnerHTML={{__html: this.faq[key]}}></span></p></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  }
}

export default Faq;