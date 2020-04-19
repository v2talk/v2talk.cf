import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './components/Home';
import More from './components/More';
import Flush from './components/Flush';
import JSONParser from "./components/JSONParser";

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/chaofeis" render={(props) => <More {...props} />}></Route>
        <Route path="/flush" render={(props) => <Flush {...props} />}></Route>
        <Route
          path="/json-parser"
          render={(props) => <JSONParser {...props} />}
        ></Route>
        <Route path="/" render={(props) => <Home {...props}/>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
