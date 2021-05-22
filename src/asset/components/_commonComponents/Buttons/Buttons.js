import React from 'react';
import PropTypes from 'prop-types';

export const ButtonItalic = ({ text, clickHandler }) => {  
  return (
    <button
      className="button-italic"
      type="button"
      onClick={clickHandler}
    >
      {text} 
    </button>
  );
};

ButtonItalic.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};

export const ButtonLight = ({ text, clickHandler }) => (
  <button
    className="button-light"
    type="button"
    onClick={clickHandler}
  >
    {text}
  </button>
);

ButtonLight.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};

export const ButtonLink = ({ text, clickHandler }) => (
  <button
    className="button-link"
    type="button"
    onClick={clickHandler}
  >
    {text}
  </button>
);

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};

export const ButtonGreen = ({ text, clickHandler }) => {  
  return (
    <button
      className="button-green"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

ButtonGreen.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};

export const ButtonPrimary = ({ text, clickHandler }) => {  
  return (
    <button
      className="button-primary"
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

ButtonPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  clickHandler: PropTypes.func
};