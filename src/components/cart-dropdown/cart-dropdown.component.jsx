import React from "react";

import { selectCartItems } from "../../redux/cart/cart.selector";

import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";

import CartItem from "../cart-item/cart-item.component";

import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/cart/cart.action";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} items={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your Cart Is Empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        Go To Checkout
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(CartDropdown);
