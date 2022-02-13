import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router-dom";
import Loader from "./components/commons/Loader";
import Kanban from "./pages/Kanban";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";
import { createBrowserHistory } from "history";
import NotFound from "./pages/NotFound";
import RecycleBin from "./pages/RecycleBin";

const AppWrapper = () => {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Header history={history} />
      <Router history={history}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={["/", ""]} component={Home} />
            <Route exact path={["/boards/:alias"]} component={Kanban} />
            <Route exact path="/trash" component={RecycleBin} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("main"));
