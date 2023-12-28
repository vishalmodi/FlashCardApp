import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

const CardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <div className="container-sm">
      <Switch>
        <Route exact={true} path={`${path}/new`}>
          <AddCard />
        </Route>
        <Route path={`${path}/:cardId/edit`}>
          <EditCard />
          </Route>
      </Switch>
    </div>
  );
};

export default CardRoutes;
