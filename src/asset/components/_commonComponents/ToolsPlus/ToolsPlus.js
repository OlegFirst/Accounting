import React from 'react';

export default ({ clickHandler }) => {
  return (
    <section
      className="tools-plus"
      onClick={clickHandler}
    >
      <div className="tools-plus__plus">+</div>
    </section>
  )
};