import React, { createContext, useMemo } from "react";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { FirebaseService, WebService } from "../services";
import { transformToUserForServer } from "../utils";

const actionInitialValue = {
  setModalConfig: (openModal: boolean, modalConfig: any) => {},
  searchBusinesses: (searchText: string, backupBusinesses: any[]) => {},
  googleSignIn: () => {},
  facebookSignIn: () => {},
  selectBusiness: (selectedBusiness: any) => {},
  fetchAllBusinesses: () => {},
};
const stateInitialValue = {
  openModal: false,
  modalConfig: { type: "" },
  user: null,
  token: "",
  backupBusinesses: [],
  businesses: [],
  selectedBusiness: null,
  searchText: "",
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
        case "SET_BUSINESS_LIST":
          return {
            ...prevState,
            backupBusinesses: action.businesses,
            businesses: action.businesses,
          };
        case "SET_BUSINESS_SINGLE_LIST":
          return {
            ...prevState,
            businesses: action.businesses,
          };
        case "SET_SELECTED_BUSINESS":
          return {
            ...prevState,
            selectedBusiness: action.selectedBusiness,
          };
        case "SET_SEARCH_TEXT":
          return {
            ...prevState,
            searchText: action.searchText,
          };
        default:
      }
    },
    {
      openModal: false,
      modalConfig: { type: "" },
      user: null,
      token: "",
      backupBusinesses: [],
      businesses: [],
      selectedBusiness: null,
      searchText: "",
    }
  );

  const actionContext = useMemo(
    () => ({
      setModalConfig: (openModal: boolean, modalConfig: any) => {
        dispatch({ type: "TOGGLE_MODAL", openModal, modalConfig });
      },
      searchBusinesses: (searchText: string, backupBusinesses: any[]) => {
        const filteredBusinesses = backupBusinesses.filter(
          (business) =>
            business.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        dispatch({ type: "SET_SEARCH_TEXT", searchText });
        dispatch({
          type: "SET_BUSINESS_SINGLE_LIST",
          businesses: filteredBusinesses,
        });
      },
      googleSignIn: async () => {
        try {
          const result = await FirebaseService.signInSocial("google");
          console.log(result.user, result.token);
          WebService.postUser(transformToUserForServer(result.user))
            .pipe(catchError((err) => of(`I caught: ${err}`)))
            .subscribe(async (data) => {
              if (data.ok) {
                console.log("Success");
                const user = await data.json();
                console.log(user);
              } else {
                console.log("Error", await data.json());
              }
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
        try {
          const result = await FirebaseService.signInSocial("facebook");
          console.log(result.user, result.token);
          WebService.postUser(result.user).subscribe((data) => {
            console.log(data);
          });
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
      selectBusiness: (selectedBusinessId: any) => {
        WebService.fetchSingleBusiness(selectedBusinessId).subscribe(
          (data: any) => {
            console.log(data);
            dispatch({ type: "SET_SELECTED_BUSINESS", selectedBusiness: data });
          }
        );
      },
      fetchAllBusinesses: () => {
        WebService.fetchAllBusinesses().subscribe((data: any) => {
          console.log(data);
          dispatch({ type: "SET_BUSINESS_LIST", businesses: data });
        });
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
