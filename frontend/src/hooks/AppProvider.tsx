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
      backupBusinesses: [
        {
          id: 1,
          name: "Chelsea Boutique",
          description:
            "is a women's designer boutique that has been a Boulder favorite for over fifteen years.",
          donationCap: 5500,
          donationPercent: 10,
        },
        {
          id: 2,
          name: "Cured",
          description:
            "...is a small shop focused on preserving a personal connection to food. We offer a hand-picked selection of cheeses, charcuterie, wines, Colorado beers and spirits, and unique grocery items,",
          donationCap: 5000,
          donationPercent: 20,
        },
        {
          id: 3,
          name: "Art Source International",
          description:
            "...specializes in antique maps, prints, original and reproduced vintage posters. Custom framing with over 25 years of service to Boulder.",
          donationCap: 6500,
          donationPercent: 40,
        },
      ],
      businesses: [
        {
          id: 1,
          name: "Chelsea Boutique",
          description:
            "is a women's designer boutique that has been a Boulder favorite for over fifteen years.",
          donationCap: 5500,
          donationPercent: 10,
        },
        {
          id: 2,
          name: "Cured",
          description:
            "...is a small shop focused on preserving a personal connection to food. We offer a hand-picked selection of cheeses, charcuterie, wines, Colorado beers and spirits, and unique grocery items,",
          donationCap: 5000,
          donationPercent: 20,
        },
        {
          id: 3,
          name: "Art Source International",
          description:
            "...specializes in antique maps, prints, original and reproduced vintage posters. Custom framing with over 25 years of service to Boulder.",
          donationCap: 6500,
          donationPercent: 40,
        },
      ],
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
                console.log("Success", await data.json());
              } else {
                console.log("Error", await data.json());
              }
            });
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
      selectBusiness: (selectedBusiness: any) => {
        dispatch({ type: "SET_SELECTED_BUSINESS", selectedBusiness });
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
