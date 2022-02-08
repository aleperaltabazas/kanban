import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./components/commons/Loader";
import Kanban from "./pages/Kanban";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path={["/"]} component={Home} />
            <Route exact path={["/boards/:id"]} component={Kanban} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
