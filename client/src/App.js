import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import store from './store/store';
import { loadUser } from './store/actions/index';
import Layout from './components/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import LoginPage from './containers/AuthPage/Auth';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import LogoutForm from './components/LogoutForm/LogoutForm'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
