import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  componentWillUpdate(){
    console.log('willUpdate');
  }
  render() {
    const ingredientSummary = Object.keys( this.props.ingredients )
      .map( igKey => {
        return (
          <li key={ igKey }>
            <span style={ { textTransform: 'capitalize' } }>{ igKey }</span>: { this.props.ingredients[igKey] }
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
        <p><strong>Total Price : { this.props.totalPrice.toFixed( 2 ) }</strong></p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={ this.props.purchaseCancelHandler }>CANCEL</Button>
        <Button btnType="Success" clicked={ this.props.purchaseContinueHandler }>CONTINUE</Button>
      </Auxiliary>
    )
  };
}
export default OrderSummary;