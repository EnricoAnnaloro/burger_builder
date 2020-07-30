import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import LoginPage from './containers/AuthPage/Auth';
import store from './store/store';
import { loadUser } from './store/actions/index';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    );
  }
}

export default App;
