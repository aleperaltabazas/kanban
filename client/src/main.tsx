import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./components/commons/Loader";
import Kanban from "./pages/Kanban";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path={["/"]} component={Home} />
          <Route exact path={["/boards/:id"]} component={Kanban} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
