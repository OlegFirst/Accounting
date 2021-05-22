import React, { useEffect, useState, useContext } from 'react';

import { ROUTER_PATH } from '../../constants';
import Nav from '../Nav/Nav';
import Tools from '../_commonComponents/Tools/Tools';
import ToolsPlus from '../_commonComponents/ToolsPlus/ToolsPlus';
import ErrorPage from '../ErrorPage';
import Modal from './Modal';
import ModalNewArticle from './ModalNewArticle';

import { 
  serverGetCosts,
  serverGetAccountsName,
  serverPutCost,
  serverPostCost,
  serverDeleteCost
} from '../../func/serverServiceCosts';

import {
  serverPostAccount  
} from '../../func/serverServiceAccounts';

import { Context } from '../Context';

export default () => {
  const [costs, setCosts] = useState(-1);
  const [accountsList, setAccountsList] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isNewRowModalShow, setIsNewRowModalShow] = useState(false);
  const [isEditModalShow, setIsEditModalShow] = useState(false);

	const {
    userId
  } = useContext(Context);	
  
  const update = () => {
		const arg = {
			user_id: userId
		};
		
		serverGetAccountsName(arg, ({ isSuccess, data }) => {
			
			// console.group("serverGetAccountsName");
			// console.log(data);
			// console.groupEnd("serverGetAccountsName");
			
			if (isSuccess) {
				setAccountsList(data);
			}
		});
		
    serverGetCosts(arg, ({ isSuccess, data }) => {
			
			// console.group("serverGetCosts");
			// console.log(data);
			// console.groupEnd(serverGetCosts);
			
			if (isSuccess && data != 0) {
				setCosts(data);
			}
			
			if (isSuccess && data == 0) {
				setCosts([]);
			}
      
      if (!isSuccess) {
        setCosts(null);
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
	
	if (!costs) {
    return <ErrorPage />;
  }
  
  if (costs === -1) {
    return <h4>Loading</h4>;
  }
  
  // New row MODAL
  const newRowHandler = res => {
    const { value, accounts_name_id } = res;
    
    if (value === "")
      return;
    
    const arg = {
			user_id: userId,
      this_name: value.toLowerCase(),
      accounts_name_id
    }
    
   serverPutCost(arg, res => {
			if (res === 'This account is present') {
				alert('This account is present!');
				return;
			}		 
      update();
      setIsNewRowModalShow(false);
    });
  }
  
  // editModalWillShow
  const editModalWillShow = item => {
    const { id, accounts_name_id, value } = item;
    setEditingItem({
      id,
      accounts_name_id,
      value
    });
    setIsEditModalShow(true);    
  };
  
  // MOdal edit current row
  const editModalOK = ({ id, accounts_name_id, value }) => {
		if (+value > 100000) {
      alert("Too much money!");
      return;
    }
    const arg = {
			user_id: userId,
      id,
      accounts_name_id,
      value
    };
    // Method POST
    serverPostCost(arg, res => {
      setIsEditModalShow(false);
      update();
    });
  };
  
  // Remove row
  const clickRemoveHandler = id => {
    const arg = {
			user_id: userId,
      id
    }    
    serverDeleteCost(arg, res => {
      update();
    });
  };
  
  const tableData = costs.map(item => (
    <tr className="table__row" key={item.id}>
      <td className="table__data">{item.this_name}</td>
      <td className="table__data">{item.value}</td>
      <td className="table__data account">{item.name}</td>
      <td className="table__data">
        <Tools
          options={{ editing: true, removing: true }}
          clickEdit={() => editModalWillShow(item)}
          clickRemove={() => clickRemoveHandler(item.id)}
        />
      </td>
    </tr>
  ));   
  
  return (
    <section className="costs pattern">
      <Nav />
      
      <h4 className="pattern__title">{ROUTER_PATH[2].title}</h4>
      
      <div className="costs__table-wrapper">
        <table className="costs__table table">
          <thead className="table__head">            
            <tr>
              <th>назва</th>
              <th>витрати, грн.</th>
              <th>рахунок</th>
              <th></th>
            </tr>
          </thead>        
          <tbody className="table__body">
            {tableData}
            
            <tr>
              <td colSpan="4" className="table__plus">
                <ToolsPlus
                  clickHandler={() => setIsNewRowModalShow(true)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
			
    {
      isEditModalShow
      &&
      <Modal
        title="Значення витрат"
        editingItem={editingItem}
        clickOK={e => editModalOK(e)}
        clickCancel={() => setIsEditModalShow(false)}  
      />
    }    
				
    {
      isNewRowModalShow && accountsList.length > 0
      &&
      <ModalNewArticle
        title="Нова стаття витрат"
        accountsList={accountsList}
        clickOK={e => newRowHandler(e)}
        clickCancel={() => setIsNewRowModalShow(false)}        
      />
    }
    </section>
  )
};