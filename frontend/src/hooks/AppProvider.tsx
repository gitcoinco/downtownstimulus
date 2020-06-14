import React, { createContext, useMemo } from "react";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { FirebaseService, WebService } from "../services";
import { transformToUserForServer } from "../utils";
import { setSelectedBusinessStripeAccountId } from "../config";
import { loadStripe } from "@stripe/stripe-js";

const actionInitialValue = {
  setModalConfig: (openModal: boolean, modalConfig: any) => {},
  searchBusinesses: (searchText: string, backupBusinesses: any[]) => {},
  googleSignIn: (type: string) => {},
  facebookSignIn: (type: string) => {},
  selectBusiness: (selectedBusiness: any) => {},
  fetchAllBusinesses: () => {},
  getClrMatchingAmount: (
    userId: number,
    businessId: number,
    amount: number
  ) => {},
  setDonationAmountState: (donationAmount: number) => {},
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
  donationAmount: 0,
  stripePromise: null,
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
        case "SET_DONATION_AMOUNT":
          return {
            ...prevState,
            donationAmount: action.donationAmount,
          };
        case "SET_STRIPE_PROMISE":
          return {
            ...prevState,
            stripePromise: action.stripePromise,
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
      donationAmount: 0,
      stripePromise: null,
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
      googleSignIn: async (type: string) => {
        try {
          const result = await FirebaseService.signInSocial("google");
          console.log(result.user, result.token);
          if (type === "signUp") {
            WebService.postUser(transformToUserForServer(result.user))
              .pipe(catchError((err) => of(`I caught: ${err}`)))
              .subscribe(async (data) => {
                if (data.ok) {
                  console.log("Success");
                  const user = await data.json();
                  console.log(user);
                  dispatch({
                    type: "SET_USER",
                    user,
                  });
                } else {
                  console.log("Error", await data.json());
                }
              });
          } else {
          }
          dispatch({ type: "TOGGLE_MODAL", openModal: false, modalConfig: {} });
        } catch (err) {
          console.log(err.message);
        }
      },
      facebookSignIn: async (type: string) => {
        try {
          const result = await FirebaseService.signInSocial("facebook");
          console.log(result.user, result.token);
          if (type === "signUp") {
            WebService.postUser(result.user)
              .pipe(catchError((err) => of(`I caught: ${err}`)))
              .subscribe(async (data) => {
                if (data.ok) {
                  console.log("Success");
                  const user = await data.json();
                  console.log(user);
                  dispatch({
                    type: "SET_USER",
                    user,
                  });
                } else {
                  console.log("Error", await data.json());
                }
              });
          } else {
          }
          dispatch({ type: "TOGGLE_MODAL", openModal: false, modalConfig: {} });
        } catch (err) {
          console.log(err);
        }
      },
      selectBusiness: (selectedBusinessId: any) => {
        WebService.fetchSingleBusiness(selectedBusinessId).subscribe(
          (data: any) => {
            console.log(data);
            setSelectedBusinessStripeAccountId(data.stripe_id);
            const stripePromise = loadStripe(
              "pk_test_51GqkJHIvBq7cPOzZUkq9YmaFXkqHMRGrjjR1Vtu1wgTBheRzG66nRvZABmllnsbybp9zbscThmhUzbkzKLnZM4EK005gPXOVAd",
              { stripeAccount: data.stripe_id }
            );
            dispatch({ type: "SET_SELECTED_BUSINESS", selectedBusiness: data });
            dispatch({ type: "SET_STRIPE_PROMISE", stripePromise });
          }
        );
      },
      fetchAllBusinesses: () => {
        WebService.fetchAllBusinesses().subscribe((data: any) => {
          console.log(data);
          dispatch({ type: "SET_BUSINESS_LIST", businesses: data });
        });
      },
      setDonationAmountState: (donationAmount: number) => {
        dispatch({ type: "SET_DONATION_AMOUNT", donationAmount });
      },
      getClrMatchingAmount: (
        userId: number,
        businessId: number,
        amount: number
      ) => {
        WebService.getClrMatchingAmount({
          user_id: userId,
          business_id: businessId,
          donation_amount: amount,
        }).subscribe(async (data) => {
          if (data.ok) {
            console.log("Success");
            const user = await data.json();
            console.log(user);
          } else {
            console.log("Error", await data.json());
          }
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
