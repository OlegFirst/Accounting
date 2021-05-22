import React, { useEffect, useState } from 'react';

import { 
  ButtonLight,
  ButtonPrimary
} from '../../_commonComponents/Buttons/Buttons';

export default ({ title, clickOK, clickCancel }) => {
  const [value, setValue] = useState('');
  
  const handleChanger = e => {
    if (value.length >= 10)
      return;
    setValue(e.target.value);
  };
  
  return (
    <section className="modal-wrapper">
      <div className="modal modal-accounts">
        <header className="modal__header">
          <h4>{title}</h4>
        </header>
      
        <main className="modal__main">
          <input
            className="modal-accounts__input"
            type="text"
            value={value}
            placeholder="Назва рахунку"
            onChange={handleChanger}
          />
        </main>
        
        <footer className="modal__footer">
          <ButtonLight 
            text="OK"
            clickHandler={() => clickOK(value)}
          />
          
          <ButtonLight 
            text="Cancel"
            clickHandler={clickCancel}
          />
        </footer>
      </div>
    </section>
  )
}