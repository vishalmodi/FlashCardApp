import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AddEditStudyCard from "./AddEditStudyCard";

const CardRoutes = () => {
  const { path } = useRouteMatch();
  return (
    <div className="container-sm">
      <Switch>
        <Route exact={true} path={`${path}/new`}>
          <AddEditStudyCard />
        </Route>
        <Route path={`${path}/:cardId/edit`}>
          <AddEditStudyCard />
          </Route>
      </Switch>
    </div>
  );
};

export default CardRoutes;
