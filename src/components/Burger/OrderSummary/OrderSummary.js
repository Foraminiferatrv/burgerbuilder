import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'

const orderSummary = ( props ) => {
  const ingredientSummary = Object.keys( props.ingredients )
    .map( igKey => {
      return (
        <li key={igKey}>
          <span style={ { textTransform: 'capitalize' } }>{ igKey }</span>: { props.ingredients[igKey] }
        </li>
      )
    } );
  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious burher with the following ingredients:</p>
      <ul>
        { ingredientSummary }
      </ul>
      <p><strong>Total Price : {props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to checkout</p>
      <Button btnType="Danger" clicked={props.purchaseCancelHandler}>CANCEL</Button>
      <Button btnType="Success" clicked={props.purchaseContinueHandler}>CONTINUE</Button>
    </Auxiliary>
  )
};

export default orderSummary;