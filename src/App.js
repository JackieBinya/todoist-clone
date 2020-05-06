import React from 'react';
import './sass/main.scss';
import { Header } from './layout/Header';
import { Content } from './layout/Content';

export const App = () => (
  <div className="App">
    <Header />
    <Content />
  </div>
);
