import React from 'react';

export default ({ options, clickEdit, clickRemove }) => {  
  const { editing, removing } = options;

  return (
    <section className="tools-type-2">
    {
      editing
      &&    
      <div
        className="tools-type-2__edit"
        onClick={clickEdit}
      >
        e
      </div>
    }
     
    {
      removing
      &&
      <div
        className="tools-type-2__remove"
        onClick={clickRemove}
      >
        x
      </div>
    }
    </section>
  )
};