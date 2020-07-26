import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/login" component={Auth} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    );
  }
}

export default App;