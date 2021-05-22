import React from 'react';

export default ({ clickPlus, clickRemove }) => {  
  return (
    <section className="tools">
      <div
        className="tools__plus"
        onClick={clickPlus}
      >
        +
      </div>
      
      <div
        className="tools__remove"
        onClick={clickRemove}
      >
        x
      </div>
    </section>
  )
};