import React, { Component } from 'react';

import Auxiliary from '../hoc/Auxiliary';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from '../components/UI/Modal/Modal';
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'
import axios from '../axios-orders';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  updatePurchaseState( ingredients ) {
    const sum = Object.keys( ingredients )
      .map( igKey => {
        return ingredients[igKey];
      } )
      .reduce( ( sum, el ) => {
        return sum + el;
      }, 0 );
    this.setState( { purchasable: sum > 0 } );
  }

  addIngredientHandler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState( updatedIngredients );
  }

  removeIngredientHanler = ( type ) => {
    const oldCount = this.state.ingredients[type];
    if ( oldCount <= 0 ) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState( { totalPrice: newPrice, ingredients: updatedIngredients } );
    this.updatePurchaseState( updatedIngredients );
  }

  purchaseHandler = () => {
    this.setState( { purchasing: true } );
  }

  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  }

  purchaseContinueHandler = () => {
    this.setState( { loading: true } );
    const order = {
      ingredients: this.state.ingredients,
      totalPrice: this.state.totalPrice,
      customer: {
        name: 'Fora',
        address: {
          street: 'Yohana street 1',
          zipCode: '55435',
          country: 'Ukraine'
        },
        email: 'drobs@gmail.com'
      }
    }
    axios.post( '/orders.json', order )
      .then( response => {
        this.setState( { loading: true, purchasing: false } );
      } )
      .catch( error => {
        this.setState( { loading: true, purchasing: false } )
      } );
  }

  componentDidMount() {
    axios.get( 'https://react-my-burger-cf10a.firebaseio.com/ingredients.json' )
      .then( response => {
        this.setState( { ingredients: response.data } )
      } )
      .catch(error=>{
        this.setState({error:true});
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for ( let key in disabledInfo ) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };
    let orderSummary = null;
    let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />;

    if ( this.state.ingredients ) {
      burger = (
        <Auxiliary>
          <Burger ingredients={ this.state.ingredients } />
          <BuildControls
            purchasable={ this.state.purchasable }
            ingredientAdded={ this.addIngredientHandler }
            ingredientRemoved={ this.removeIngredientHanler }
            disabled={ disabledInfo }
            ordered={ this.purchaseHandler }
            price={ this.state.totalPrice } />
        </Auxiliary> );
      orderSummary = < OrderSummary
        ingredients={
          this.state.ingredients
        }
        purchaseCancelHandler={
          this.purchaseCancelHandler
        }
        purchaseContinueHandler={
          this.purchaseContinueHandler
        }
        totalPrice={
          this.state.totalPrice
        }
      />;
    }
    if ( this.state.loading ) {
      orderSummary = <Spinner />
    }

    return (
      <Auxiliary>
        <Modal show={ this.state.purchasing } modalClosed={ this.purchaseCancelHandler }>
          { orderSummary }
        </Modal>
        { burger }
      </Auxiliary>
    );
  }
}

export default withErrorHandler( BurgerBuilder, axios );