import React from 'react';

import {  Route, Routes } from 'react-router-dom';


import './App.css';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignINAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';




function App() {
  return (
    <div> 
      <Header/> 
      <Routes>
     <Route exact path='/' element={<HomePage/>}/>
      <Route path='/shop' element={<ShopPage/>}/>
      <Route path='/signin' element={<SignINAndSignUpPage/>}/>

        </Routes>    
    </div>
  );
}

export default App;
