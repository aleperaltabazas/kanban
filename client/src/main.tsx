import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loader from "./components/commons/Loader";
import Modal from "./context/Modal";
import Snackbar from "./context/Snackbar";
import KanbanPage from "./pages/Kanban";

const App = () => {
  return (
    <Snackbar>
      <Modal>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route exact path={["/kanban", "/", ""]} component={KanbanPage} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Modal>
    </Snackbar>
  );
};

ReactDOM.render(<App />, document.getElementById("main"));
