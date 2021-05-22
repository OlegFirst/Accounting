import React, { useEffect, useState, useRef, useContext } from 'react';

import { ROUTER_PATH } from '../../constants';
import Nav from '../Nav/Nav';
import ErrorPage from '../ErrorPage';

import {
  serverGetAccounts  
} from '../../func/serverServiceAccounts';

import {
  canvasPreparation
} from './func';

import { Context } from '../Context';

export default () => {
  const canRef = useRef();
  const [accounts, setAccounts] = useState(-1);
	
	const {
    userId
  } = useContext(Context);
  
  useEffect(() => {
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
  }, []);
  
  useEffect(() => {
    if (accounts) {
      if (accounts !== -1) {
        const arg = accounts.map(({ name, costs, incomes }) => ({ name, costs, incomes }));
        canvasPreparation(arg, canRef.current);
      }
    }    
  }, [ accounts ]);
  
  if (!accounts) {
    return <ErrorPage />;
  }
  
  if (accounts === -1) {
    return <h4>Loading</h4>;
  }
  
  const canvasCaptionList = accounts.map(({ name }, index) => {
    return (
      <li className="canvas-caption__item" key={index}>
        <span>{index + 1} - </span>
        <span>{name}</span>
      </li>
    )
  });
  
  const CanvasCaptionColors = () => {
    return (
      <>
        <li className="canvas-caption__color color">
          <span className="color__block color__block_red" />
          <span className="color__text">Доходи</span>
        </li>
        
        <li className="canvas-caption__color color">        
          <span className="color__block color__block_blue" />
          <span className="color__text">витрати</span>
        </li>
      </>
    )    
  };
  
  return (
    <section className="graph pattern">
      <Nav />
      
      <h4 className="pattern__title">{ROUTER_PATH[3].title}</h4>
      
      <div className="canvas-wrapper">
        <canvas ref={canRef} className="canvas" />
      </div>
      
      <ul className="canvas-caption">
        <CanvasCaptionColors />
        
        {canvasCaptionList}
      </ul>
    </section>
  )
};