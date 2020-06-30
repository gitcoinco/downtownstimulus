import React, { useEffect } from "react";
import "./App.scss";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Home from "./components/Home";
import BusinessPage from "./components/BusinessPage";
import { Route, Redirect, useHistory } from "react-router-dom";
import Footer from "./components/Footer";
import AccountInfo from "./components/AccountInfo";

function App() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Modal></Modal>
      <Header></Header>
      <Route path="/" exact render={() => <Home></Home>} />
      <Route
        path="/business/:id/:slug"
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
