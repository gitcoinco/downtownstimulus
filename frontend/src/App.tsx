import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./components/Home";
import BusinessPage from "./components/BusinessPage";
import { Route, Redirect } from "react-router-dom";
import Footer from "./components/Footer";
import AccountInfo from "./components/AccountInfo";

function App() {
  return (
    <div className="App">
      <Modal></Modal>
      <Header></Header>
      <Route path="/" exact render={() => <Home></Home>} />
      <Route
        path="/business/:id"
        exact
        render={() => <BusinessPage></BusinessPage>}
      />
      <Route
        path="/account"
        exact
        render={() =>
          sessionStorage.getItem("user") ? (
            <AccountInfo></AccountInfo>
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Footer></Footer>
    </div>
  );
}

export default App;
