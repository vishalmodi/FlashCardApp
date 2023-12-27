import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddCard from "./AddCard";

const CardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <div className="container-sm">
      <Switch>
        <Route exact={true} path={`${path}/new`}>
          <AddCard />
        </Route>
        <Route path={`${path}/:cardId/edit`}>Edit Card</Route>
        <h1>Default Path</h1>
      </Switch>
    </div>
  );
};

export default CardRoutes;
