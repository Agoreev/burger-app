import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./containers/layout";
import BurgerBuilder from "./containers/burger-builder";
import Checkout from "./containers/checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Orders from "./containers/orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Layout>
            <Switch>
              <Route path="/" component={BurgerBuilder} exact />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
              <Route path="/logout" component={Logout} />
              <Route render={() => <h2>Page not found</h2>} />
            </Switch>
          </Layout>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default connect(null, mapDispatchToProps)(App);
