import React from "react";
import parse from "html-react-parser";

interface IFaqItems {
  [question: string]: string;
}

const faqItems: IFaqItems = {
  "What's this?": `Just a birthday card with some facts about target's age, birthday date 
        and picture from NASA`,
  "For whom?": `Just for fun and for me to study React`,
  "Can i see the code?": `Sure, here's the 
<a href="https://github.com/kskonovalov/bday" target="_blank" rel='noopener noreferrer'>Github repo</a>`
};

const Faq: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>FAQ</h1>
            <ul>
              {Object.keys(faqItems).map(key => (
                <li key={key}>
                  <p>
                    <b>{key}</b>
                    <br />
                    {parse(faqItems[key])}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
