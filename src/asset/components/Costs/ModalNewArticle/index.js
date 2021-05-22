import React, { useEffect, useState } from 'react';

import { 
  ButtonLight,
  ButtonPrimary
} from '../../_commonComponents/Buttons/Buttons';

export default ({ title, accountsList, clickOK, clickCancel }) => {
  const [value, setValue] = useState('');  
	const [selectValueResult, setSelectValueResult] = useState({ id:  accountsList[0].id, name: accountsList[0].name });
  
	console.log('ModalNewArticl ', accountsList);
	
  const items = accountsList.map(({ id, name }) => {
    return (
      <option
        key={id}
        value={name}
        className={`option-${id}`}
      >
        {name}
      </option>
    )
  });
  
  const handleChanger = e => {
    if (value.length >= 10)
      return;
    setValue(e.target.value);
  };
  
  const selectHandleChanger = e => {};	
	
	const onClickHandler = e => {
		const target = e.target;
		const className = target.classList[0];
    const id = className.replace("option-", "");		
		const selectedAccount = accountsList.filter(item => {
			return item.id === id;
		});
		
		// console.group("selectedAccount");
		// console.log(selectedAccount);
		// console.groupEnd(selectedAccount);		
		
		setSelectValueResult(selectedAccount[0]);
	};
  
  return (
    <section className="modal-wrapper">
      <div className="modal modal-new-article">
        <header className="modal__header">
          <h4>{title}</h4>
        </header>
      
        <main className="modal__main">
          <input
            className="modal-new-article__input"
            type="text"
            placeholder="Назва статті"
            value={value}
            onChange={handleChanger}
          />				
          
          <p>Pахунок</p>
          
          <select
            className="modal-new-article__select"
						onClick={onClickHandler}
						onChange={e => selectHandleChanger(e)}
          >
            {items}
          </select>
        </main>
        
        <footer className="modal__footer">
,           <ButtonLight 
            text="OK"
            clickHandler={() => clickOK({value, accounts_name_id: selectValueResult.id})}
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