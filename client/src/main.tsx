import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./components/commons/Loader";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={["/kanban", "/", ""]} component={Loader} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
