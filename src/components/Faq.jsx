import React from 'react';

const faqItems = {
  'What\'s this?': `Just a birthday card with some facts about target's age, birthday date 
        and picture from NASA`,
  'For whom?': `Just for fun and for me to study React`,
  'Can i see the code?': `Sure, here's the 
<a href="https://github.com/picprofit/bday" target="_blank" rel='noopener noreferrer'>Github repo</a>`,
};

const Faq = () => {
  
    return <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>FAQ</h1>
            <ul>
              {Object.keys(faqItems).map(
                key => <li key={key}><p><b>{key}</b><br/><span dangerouslySetInnerHTML={{__html: faqItems[key]}}></span></p></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
}

export default Faq;