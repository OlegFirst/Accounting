import React from 'react';

import { ROUTER_PATH } from '../../constants';
import Nav from '../Nav/Nav';

export default () => {
  return (
    <section className="error-page pattern">
      <Nav />
      
      <h4 className="pattern__title">
        Сторінку не знайдено або проблеми з сервером
      </h4>
      
    </section>
  )
};