import React, { useEffect, useState } from 'react';

import {
  serverAuthenticationGet,
  serverAuthenticationPut
} from '../../func/serverServiceAuthentication';
import { 
  nameValidation,
  passwordValidation
} from '../../func/formValidation';

import { AUTHENTICATION } from '../../constants';

import { 
  ButtonGreen,
  ButtonPrimary
} from '../_commonComponents/Buttons/Buttons';

const Enter = ({ isShow, enterRole, clickHandler }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState({
    name: false,
    password: false
  });
  const [isLengthError, setIsLengthError] = useState({
    name: false,
    password: false
  });
  
  // Name length checker
  useEffect(() => {
    if (name.length > AUTHENTICATION.name.length) {
      const isLengthErrorCopy = Object.assign({}, isLengthError, { name: true });
      setIsLengthError(isLengthErrorCopy);
    } else {
      const isLengthErrorCopy = Object.assign({}, isLengthError, { name: false });
      setIsLengthError(isLengthErrorCopy);
    }
  }, [name]);
  
  // Password length checker
  useEffect(() => {
    if (password.length > AUTHENTICATION.password.length) {
      const isLengthErrorCopy = Object.assign({}, isLengthError, { password: true });
      setIsLengthError(isLengthErrorCopy);
    } else {
      const isLengthErrorCopy = Object.assign({}, isLengthError, { password: false });
      setIsLengthError(isLengthErrorCopy);
    }    
  }, [password]);
  
  if (!isShow) {
    return null;
  }
  
  // Ok
  const buttonOKClick = () => {
    const validationResults = {
      name: nameValidation(name),
      password: passwordValidation(password)
    };    
    const errorValues = Object.values(validationResults);
    let isOK = true;
    errorValues.forEach(value => {
      if (!value) {
        isOK = false;
      }
    });
    
    if (isOK) {
      console.clear();
      const data = JSON.stringify({ name, password });      
      
      switch (enterRole) {
        case 'signUp':
          serverAuthenticationPut(data, res => {
            if (res) {
              clickHandler({
                isOK: true,
                name,
                enterRole,
              });
            } else {
              alert("This account is present!");
            }
          });
          break;
          
        case 'signIn':
          serverAuthenticationGet(data, res => {
            if (res) {
              clickHandler({
                isOK: true,
                enterRole,
                name
              });
            } else {
              alert("User name or password are wrong!");
            }
          });
          break;
        default:
          console.log('Wrong request')
      }
    }
    
    setIsError({
      name: !validationResults.name,
      password: !validationResults.password,
      code: !validationResults.code
    });
  };
  
  // Cancel
  const buttonCancelClick = () => {
    clickHandler({
      isOK: false,
      name: null
    });
  };
  
  return (
    <div className="enter-container">
      <div className="enter">
        <div className="enter__title">
        {
          enterRole === 'signUp'
          &&
          <h2>
            Реєстрація
          </h2>
        }
        
        {
          enterRole === 'signIn'
          &&
          <h2>
            Bхід
          </h2>
        }
        </div>
        
        <div className="enter__fields">
          <div className="enter__name">
            <input
              className={`enter__name-input ${isLengthError.name ? 'enter__name-input_length-error' : ''}`}
              type="text"
              placeholder="Ім'я"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span
              className={`enter__name-error ${isError.name ? 'enter__name-error_show' :  ''}`}
            >
              Помилка
            </span>
          </div>
          
          <div className="enter__password">
            <input
              className={`enter__password-input ${isLengthError.password ? 'enter__password-input_length-error' : ''}`}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />            
            <span
              className={`enter__password-error ${isError.password ? 'enter__password-error_show' :  ''}`}
            >
              Необхідна цифра та велика літера
            </span>
          </div>
        </div>
        
        <div className="enter__footer">
          <ButtonPrimary
            text='Cancel'
            clickHandler={buttonCancelClick}
          />
          
          <ButtonGreen 
            text='Ok'
            clickHandler={buttonOKClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Enter;