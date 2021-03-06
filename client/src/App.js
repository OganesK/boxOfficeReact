import React from "react";
import {Switch, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Starred from "./pages/Starred/Starred";
// import './pages/Home/Home.css'

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/starred'>
        <Starred />
      </Route>
      <Route>
        <div>
            This is 404 page
        </div>
        </Route>
      </Switch>
  );
}

export default App;
