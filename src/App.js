import React from 'react';

import {  Route, Routes , Navigate } from 'react-router-dom';

import { connect } from 'react-redux';


import './App.css';

import CheckoutPage from './pages/checkoutpage/checkoutpage.component';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignINAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user.action';

import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';




class App extends React.Component  {
unsubscribeFromAuth = null;

 componentDidMount() {
 
  const { setCurrentUser } = this.props;

  this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
    if ( userAuth ) {
      const userRef = await createUserProfileDocument (userAuth);

      userRef.onSnapshot(snapShot => {
       setCurrentUser({
        currentUser : {
          id : snapShot.id,
          ...snapShot.data()
        }
       });
      });
    }
      setCurrentUser (userAuth);
    
  });
 }

 componentWillUnmount () {
  this.unsubscribeFromAuth();
 }

  render() {
    return (
      <div> 
        <Header /> 
        <Routes>
       <Route exact path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<ShopPage/>}/>
        <Route exact path='/checkout' element={<CheckoutPage/>}/>

        {/* <Route 
        exact 
        path='/signin' 
         render={ () => this.props.currentUser ? 
           <Navigate to='/' /> : 
           <SignINAndSignUpPage/> }/> */}
           <Route path='/signin' element={this.props.currentUser ? 
           <Navigate to='/'/> : <SignINAndSignUpPage/>} />
  
          </Routes>    
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps )(App);
