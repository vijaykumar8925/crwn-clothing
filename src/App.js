import React from 'react';

import {  Route, Switch , Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { checkUserSession } from './redux/user/user.action';

import './App.css';

import CheckoutPage from './pages/checkoutpage/checkoutpage.component';

import HomePage from './pages/homepage/homepage.component';

import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignINAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';



import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';


class App extends React.Component  {
unsubscribeFromAuth = null;

 componentDidMount() {
   const { checkUserSession } = this.props;
      checkUserSession();     
 }

 componentWillUnmount () {
  this.unsubscribeFromAuth();
  
 }

  render() {
    return (
      <div> 
        <Header /> 
        <Switch>
       <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route exact path='/checkout' component={CheckoutPage}/>

        {/* <Route 
        exact 
        path='/signin' 
         render={ () => this.props.currentUser ? 
           <Navigate to='/' /> : 
           <SignINAndSignUpPage/> }/> */}
           <Route exact path='/signin' render= { () => this.props.currentUser ? 
           (<Redirect to='/'/>) : (<SignINAndSignUpPage/>)} />
  
          </Switch>    
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps )(App);
