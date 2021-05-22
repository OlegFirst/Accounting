import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTER_PATH } from '../../constants';

export default () => {
  const currentPath = window.location.pathname;
  
  const itemList = ROUTER_PATH.map((item, index) => (
    <li
      className={` nav__item nav__item_${currentPath === item.url ? 'active' : ''} `}
      key={index}
    >
      <Link to={item.url}>
        {item.title}
      </Link>
    </li>
  ));
  
  return (
    <nav className="nav">
      <ul className="nav__items">
        {itemList}
      </ul>
    </nav>
  )
};