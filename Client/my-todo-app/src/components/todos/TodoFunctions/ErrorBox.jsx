import React from "react";

const ErrorBox = ({ errorMessages }) => {
  if (errorMessages.length === 0) return null;

  return (
    <div className="error-box">
      {errorMessages.map((message, index) => (
        <p key={index} className="error-message">
          {message}
        </p>
      ))}
    </div>
  );
};

export default ErrorBox;
