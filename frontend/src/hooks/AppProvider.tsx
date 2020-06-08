import React, { createContext, useMemo } from "react";
import { FirebaseService, WebService } from "../services";
import { transformToUserForServer } from "../utils";
const actionInitialValue = {
  setModalConfig: (openModal: boolean, modalConfig: any) => {},
  googleSignIn: () => {},
  facebookSignIn: () => {},
};
const stateInitialValue = {
  openModal: false,
  modalConfig: { type: "" },
  user: null,
  token: "",
};
export const ActionContext = createContext(actionInitialValue);
export const StateContext = createContext(stateInitialValue);

export const AppProvider = (props: any) => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "TOGGLE_MODAL":
          return {
            ...prevState,
            openModal: action.openModal,
            modalConfig: action.modalConfig,
          };
        case "SET_USER":
          return {
            ...prevState,
            user: action.user,
            token: action.token,
          };
        default:
      }
    },
    {
      openModal: false,
      modalConfig: { type: "" },
      user: null,
      token: "",
      businesses: [],
      selectedBusiness: null,
    }
  );

  const actionContext = useMemo(
    () => ({
      setModalConfig: (openModal: boolean, modalConfig: any) => {
        dispatch({ type: "TOGGLE_MODAL", openModal, modalConfig });
      },
      googleSignIn: async () => {
        console.log("Google");
        try {
          const result = await FirebaseService.signInSocial("google");
          console.log(result.user, result.token);
          WebService.postUser(transformToUserForServer(result.user)).subscribe(
            (data) => {
              console.log(data);
            }
          );
          WebService.fetchAllBusinesses().subscribe((data) => {
            console.log(data);
          });
          dispatch({
            type: "SET_USER",
            user: result.user,
            token: result.token,
          });
          dispatch({ type: "TOGGLE_MODAL", openModal: false, modalConfig: {} });
        } catch (err) {
          console.log(err.message);
        }
      },
      facebookSignIn: async () => {
        console.log("Facebook");
        try {
          const result = await FirebaseService.signInSocial("facebook");
          console.log(result.user, result.token);
          const serverResponse = WebService.postUser(result.user).subscribe();
          console.log(serverResponse);
          dispatch({
            type: "SET_USER",
            user: result.user,
            token: result.token,
          });
          dispatch({ type: "TOGGLE_MODAL", openModal: false, modalConfig: {} });
        } catch (err) {
          console.log(err);
        }
      },
    }),
    []
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};
