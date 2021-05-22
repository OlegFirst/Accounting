import React, { useEffect, useState, useContext } from 'react';

import {
  serverGetAccounts,
	serverPostAccount
} from '../../func/serverServiceAccounts';

import { ROUTER_PATH } from '../../constants';
import Nav from '../Nav/Nav';
import Tools from '../_commonComponents/Tools/Tools';
import Modal from './Modal';
import ErrorPage from '../ErrorPage';

import { Context } from '../Context';

export default () => {  
  const [isModalShow, setIsModalShow] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [accounts, setAccounts] = useState(-1);
	
	const {
    userId
  } = useContext(Context);
  
  const update = () => {
		const arg = {
			user_id: userId
		}
		
    serverGetAccounts(arg, ({ isSuccess, data }) => {      
      if (isSuccess && data !== 0) {
        setAccounts(data);
      }
      
      if (isSuccess && data === 0) {
        setAccounts([]);
      }
      
      if (!isSuccess) {
        setAccounts(null);
      }      
    });
  };
	
	useEffect(() => {
		if (!userId) {
			return;
		}
		
    update();
  }, [ userId ]);
  
  if (!accounts) {
    return <ErrorPage />;
  }
  
  if (accounts === -1) {
    return <h4>Loading</h4>;
  }
  
  // Tools
  const toolsClickEdit = item => {    
    setEditingItem(item);
    setIsModalShow(true);
  };
  
  // Modal Remove
  const clickRemoveHandler = id => {
    //console.log(id)
  };
  
  // Modal OK
  const clickOKHandler = value => {
    if (value > 100000) {
      alert("Too big");
      return;
    }
    
    const { id, incomes } = editingItem;
    
    const arg = {
			user_id: userId,
      id,
      incomes: value
    };
		
		// const arg = {      
      // id,
      // costs,
      // incomes: value,
      // remainder: value - costs      
    // };
    
    // if (arg.remainder < 0) {
      // alert("Not enough money!");
      // setIsModalShow(false);
      // return;
    // }
    
    // - Try saving info to Data Base
    serverPostAccount(arg, res => {      
      setIsModalShow(false);
      update();
    });
  };
  
  const tableData = accounts.map(item => (
    <tr className="table__row" key={item.id}>
      <td className="table__data account">{item.name}</td>
      <td className="table__data">{item.incomes}</td>
      <td className="table__data">
        <Tools
          options={{ editing: true, removing: false }}
          clickEdit={() => toolsClickEdit(item)}
          clickRemove={() => clickRemoveHandler(item.id)}
        />
      </td>
    </tr>
  ));
  
  return (
    <section className="incomes pattern">
      <Nav />
      
      <h4 className="pattern__title">{ROUTER_PATH[1].title}</h4>
      
      <div className="incomes__table-wrapper">
        <table className="incomes__table table">
          <thead className="table__head">            
            <tr>
              <th>рахунок</th>
              <th>доходи, грн.</th>
              <th></th>
            </tr>
          </thead>        
          <tbody className="table__body">
            {tableData}
          </tbody>
        </table>
      </div>
      
    {
      isModalShow
      &&
      <Modal 
        title="Редагувати доходи"
        modalValue={+editingItem.incomes}
        clickOK={e => clickOKHandler(e)}
        clickCancel={() => setIsModalShow(false)}
      />
    }
    </section>
  )
};