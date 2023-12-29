import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Layout/Header";
import DeckList from "./features/decks/DeckList";
import NotFound from "./Layout/NotFound";
import "./App.css";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <DeckList />
          </Route>
          <Route path="/decks">
            <DeckList />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
