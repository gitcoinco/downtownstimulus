import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./components/Home";
import BusinessPage from "./components/BusinessPage";
import { Route } from "react-router-dom";
import Footer from "./components/Footer";

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
      <Footer></Footer>
    </div>
  );
}

export default App;
