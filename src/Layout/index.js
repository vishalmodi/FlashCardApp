import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../features/decks/DeckList";
// import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "../features/decks/CreateDeck";

function Layout() {
  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            {/* <DeckList /> */}
          </Route>
          <Route exact={true} path={"/deck/new"}>
            {/* <CreateDeck /> */}
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
