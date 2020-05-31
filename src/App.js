import React from "react";
import Layout from "./containers/layout";
import BurgerBuilder from "./containers/burger-builder";
import Checkout from "./containers/checkout";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Layout>
        <Router>
          <Switch>
            <Route path="/" component={BurgerBuilder} exact />
            <Route path="/checkout" component={Checkout} />
            <Route render={() => <h2>Page not found</h2>} />
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
