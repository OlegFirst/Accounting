import React, { useEffect, useState, useContext } from 'react';

import {
  ButtonLight
} from '../_commonComponents/Buttons/Buttons';
import { Context } from '../Context';
import Enter from '../Enter/Enter';
import {
  serverAuthenticationGet,
  serverAuthenticationPut
} from '../../func/serverServiceAuthentication';

const Authentication = () => {	
  const {
    authorized,
		passUserName
  } = useContext(Context);
  
  const [isLoggined, setIsLoggined] = useState(false);
  const [userName, setUserName] = useState('');
  const [enterRole, setEnterRole] = useState(null);
  const [isEnterShow, setIsEnterShow] = useState(false);  
  
  // Check if user has already authenticated
  useEffect(() => {
    authorized(false);
  }, []);
	
	//
	useEffect(() => {
		if (userName === '') {
			return;
		}
		
		passUserName(userName);
	}, [userName])
  
	// - New cabinet
  const signUp = () => {    
    setEnterRole('signUp');
    setIsEnterShow(true);
  }
  
  const signIn = () => {
    setEnterRole('signIn');
    setIsEnterShow(true);
  };
  
  const signOut = () => {
    authorized(false);
    setIsLoggined(false);
    setUserName('');
  };
  
  const enterClickHandler = ({ isOK, enterRole, name }) => {
    setIsEnterShow(false);
    
    if (isOK) {      
      authorized(true);
      setIsLoggined(true);
      setUserName(name);
    } else {
      // authorized(flase);
      // console.log(null);
    }
  };
  
  return (
    <>
      <section className="authentication">
        <h4 className="authentication__user-name">Користувач: {userName}</h4>
      
        {  
          !isLoggined
          &&
          <ButtonLight
            text="Зайти"
            clickHandler={signIn}
          />
        }
        
        {
          !isLoggined
          &&
          <ButtonLight
            text="Новий кабінет"
            clickHandler={signUp}
          />
        }
          
        {
          isLoggined
          &&      
          <div className="authentication__name"></div>
        }
        
        {
          isLoggined
          &&      
          <ButtonLight
            text="Вийти з особистого кабінету"
            clickHandler={signOut}
          />
        }
      </section>
      
      <Enter 
        isShow={isEnterShow}
        enterRole={enterRole}
        clickHandler={enterClickHandler}
      />
    </>
  )
};

export default Authentication;