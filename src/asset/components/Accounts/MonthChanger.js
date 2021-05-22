import React from 'react';

export default ({ month, clickLeft, clickRight }) => {  
  return (
    <section className="month-changer">
      <div
        className="month-changer triangle triangle-left"
        onClick={clickLeft}
      />
      
      <span className="month-changer__text">{month}</span>
      
      <div
        className="month-changer triangle triangle-right"
        onClick={clickRight}
      />
    </section>
  )
};