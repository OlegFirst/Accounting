import React, { useEffect, useState, useContext } from 'react';

import {
  serverGetAccounts,
  serverPutAccount,
  serverDeleteAccount
} from '../../func/serverServiceAccounts';

import {  
  serverGetCosts
} from '../../func/serverServiceCosts';

import { ROUTER_PATH } from '../../constants';
import Nav from '../Nav/Nav';
import MonthChanger from './MonthChanger';
import Tools from './Tools';
import Modal from './Modal';
import ErrorPage from '../ErrorPage';

import { Context } from '../Context';

export default () => {
  const [accounts, setAccounts] = useState(-1);
  const [isModalShow, setIsModalShow] = useState(false);
  const [isModalRemoveShow, setIsModalRemoveShow] = useState(false);
	
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
  }, [userId]);
  
  useEffect(() => {
		if (!userId) {
			return;
		}		
    update();
  }, []);
  
  if (!accounts) {
    return <ErrorPage />;
  }
  
  if (accounts === -1) {
    return <h4>Loading</h4>;
  }
  
  // Get data from INSERT NEW ACCOUNT Modal
  const clickOKHandler = value => {
    if (value === "")
      return;    
    const newValue = value.toLowerCase();
    
    if (accounts.length > 20) {
      alert("Too many accounts!");
      return;
    }
		
		const arg = {
			user_id: userId,
			name: newValue
		};
    
    // - Try saving to Data Base
    serverPutAccount(arg, res => {      
      if (res === 'New record created successfully') {
				setIsModalShow(false);
				update();
      }
    });
  };
  
  // Get data from REMOVE ACCOUNT Modal
  const clickRemoveHandler = value => {
    if (value === "")
      return;    
    const newValue = value.toLowerCase();
		
    const item = accounts.filter(({ name }) => {
      return name === newValue;
    });
    
    if (item.length === 0) {
      alert("This account is not found");
      return;
    }
		
		const arg = {
			user_id: userId,
      id: item[0].id,
      accounts_name_id: item[0].accounts_name_id
    };

    // - Try deleting the account
		serverGetCosts(arg, ({ isSuccess, data }) => {
			setIsModalRemoveShow(false);
			
			if (isSuccess) {
				let isAccountPresent = false;
				if (data !== 0) {
					isAccountPresent = data.some(item => {
						return arg.accounts_name_id === item.accounts_name_id
					});
				}
				
				if (!isAccountPresent) {
					serverDeleteAccount(arg, res => {						
						update();
					});
				} else {
					alert("Видаліть із Статті витрат спочатку");
				}
			}
		});		
	}; 
    
  const tableData = accounts.map(item => (
    <tr className="table__row" key={item.id}>
      <td className="table__data account">{item.name}</td>
      <td className="table__data">{item.costs}</td>
      <td className="table__data">{item.incomes}</td>
      <td className="table__data">{item.remainder}</td>
    </tr>
  ));
  
  return (
    <section className="accounts pattern">
      <Nav />
      
      <h4 className="pattern__title">{ROUTER_PATH[0].title}</h4>
      
      <div className="accounts__table-wrapper">
        <table className="accounts__table table">
          <thead className="table__head">
            <tr>
              <th className="table__info" colSpan="4">
                <div className="table__info-inner">                
                  <Tools
                    clickPlus={() => setIsModalShow(true)}
                    clickRemove={() => setIsModalRemoveShow(true)}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th>рахунок</th>
              <th>витрати, грн.</th>
              <th>доходи, грн.</th>
              <th>залишок, грн.</th>
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
        title="Додати новий рахунок"
        clickOK={e => clickOKHandler(e)}
        clickCancel={() => setIsModalShow(false)}
      />
    }
      
    {  
      isModalRemoveShow
      &&
      <Modal
        title="Bидалити рахунок"
        clickOK={e => clickRemoveHandler(e)}
        clickCancel={() => setIsModalRemoveShow(false)}
      />
    }
    </section>
  )
};