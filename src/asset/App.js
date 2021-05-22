import React, { useEffect, useState } from 'react';
import Router from './router/Router';

import { Context } from './components/Context';
import Authentication from './components/Authentication/Authentication';

import {
	serverAuthenticationGetUserId
} from './func/serverServiceAuthentication';

function App() {
  const [isLoggined, setIsLoggined] = useState(false);
	const [userId, setUserId] = useState(null);
  
  // Call back from
  const authorized = value => {    
    setIsLoggined(value);
  };
	
	const passUserName = name => {
		const arg = {
      name
    };
		
		serverAuthenticationGetUserId(arg, ({ isSuccess, data }) => {			
			if (isSuccess) {
				if (data.length > 0) {
					setUserId(+data[0].id);
				} else {
					alert('Can`t read user id!');
				}
			}
    });
	};
  
  return (
    <Context.Provider
      value={{
        authorized,
				passUserName,
				userId
      }}
    >
      <div className="app">
        <Authentication />
        
        {
          //true
					isLoggined
          &&
          <Router />
        }
        
        {
					//false
          !isLoggined
          &&
          <h4 className="app__message">Для початку роботи авторизуйтеся, будь-ласка</h4>   
        }
      </div>
    </Context.Provider>
  );
}

export default App;