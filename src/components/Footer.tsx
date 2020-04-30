import React from "react";
import { Link } from "react-router-dom";

interface IFooterLinks {
  url: string;
  text: string;
  blank?: boolean;
}
const footerLinks: IFooterLinks[] = [
  {
    url: '/',
    text: 'New card'
  },
  {
    url: '/cards',
    text: 'My cards'
  },
  {
    url: '/faq',
    text: 'FAQ'
  },
  {
    url: 'https://github.com/kskonovalov/bday',
    text: 'Source on GitHub',
    blank: true
  }
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="col-md-6 text-right">
          <ul className="list-inline footer-links">
            {footerLinks.map((item) => {
              if(item.blank) {
                return <li id={item.url}>
                  <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    {item.text}
                  </a>
                </li>;
              }
              return <li id={item.url}>
                <Link to={item.url}>{item.text}</Link>
              </li>;
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
