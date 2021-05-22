import React, { useEffect, useState } from 'react';

import { 
  ButtonLight,
  ButtonPrimary
} from '../../_commonComponents/Buttons/Buttons';

export default ({ title, editingItem, clickOK, clickCancel }) => {
  const [value, setValue] = useState(editingItem.value);
  
  const handleChanger = e => {
    if (value.length >= 10)
      return;
    setValue(e.target.value);
  };
  
  return (
    <section className="modal-wrapper">
      <div className="modal modal-costs-edit">
        <header className="modal__header">
          <h4>{title}</h4>
        </header>
      
        <main className="modal__main">
          <input
            className="modal-accounts__input"
            type="number"
            value={value}
            onChange={handleChanger}
          />
        </main>
        
        <footer className="modal__footer">
          <ButtonLight 
            text="OK"
            clickHandler={() => clickOK(
              {
                id: editingItem.id,
                accounts_name_id: editingItem.accounts_name_id,
                value
              }
            )}
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