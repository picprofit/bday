import React from 'react';
import PropTypes from 'prop-types';

const NotFound = (props) => (
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2>404: Page not found</h2>
        {(typeof(props.text) !== undefined) ? <h3>{props.text}</h3> : ""}
      </div>
    </div>
  </div>
);

NotFound.propTypes = {
  text: PropTypes.string
};

export default NotFound;