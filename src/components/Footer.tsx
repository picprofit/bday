import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="col-md-6 text-right">
          <ul className="list-inline footer-links">
            <li>
              <Link to="/">New card</Link>
            </li>
            <li>
              <Link to="/cards">My cards</Link>
            </li>
            <li>
              <Link to="/faq">faq</Link>
            </li>
            <li>
              <a
                href="https://github.com/picprofit/bday"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source on GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
