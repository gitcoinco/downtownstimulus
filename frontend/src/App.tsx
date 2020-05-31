import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home></Home>
      <Modal></Modal>
    </div>
  );
}

export default App;
