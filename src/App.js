import React from "react";
import Layout from "./components/layout";
import BurgerBuilder from "./containers/burger-builder";
function App() {
  return (
    <div className="App">
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
