import React from "react";
import SearchPage from "./pages/Search/Search.page";
import DetailPage from "./pages/Detail/Detail.page";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:objectNumber" component={DetailPage} />
        <Route path="/" component={SearchPage} />
      </Switch>
    </Router>
  );
}

export default App;
