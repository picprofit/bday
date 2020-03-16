import React from "react";

const NotFound: React.FC<{ text: string }> = ({ text = "" }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h2>404: Page not found</h2>
          {text.length === 0 ? <h3>{text}</h3> : ""}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
