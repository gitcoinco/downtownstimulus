import React, { createContext, useMemo } from "react";
import { of } from "rxjs";
import { catchError } from "rxjs/operators";
import { FirebaseService, WebService } from "../services";
import { transformToUserForServer } from "../utils";
import { setSelectedBusinessStripeAccountId } from "../config";
import { loadStripe } from "@stripe/stripe-js";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const actionInitialValue = {
  setModalConfig: (openModal: boolean, modalConfig: any) => {},
  searchBusinesses: (searchText: string, backupBusinesses: any[]) => {},
  googleSignIn: (type: string) => {},
  facebookSignIn: (type: string) => {},
  selectBusiness: (selectedBusiness: any) => {},
  fetchAllBusinesses: () => {},
  getFixedClrMatchingAmount: (allMatchingArrays: Array<any>) => {},
  getCustomClrMatchingAmount: (allMatchingArrays: Array<any>) => {},
  setDonationAmountState: (donationAmount: number) => {},
  logoutUser: () => {},
  updateUser: (id: string, updatedUser: any) => {},
  setOpenedQfExplainerFirstTime: (openedQfExplainerFirstTime: boolean) => {},
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
  fixedDonationMatching: [0, 0, 0],
  customDonationMatching: [0],
  openedQfExplainerFirstTime: false,
};
export const ActionContext = createContext(actionInitialValue);
export const StateContext = createContext(stateInitialValue);

export const AppProvider = (props: any) => {
  const history = useHistory();
  const alert = useAlert();
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
        case "SET_FIXED_DONATION_MATCHING":
          return {
            ...prevState,
            fixedDonationMatching: action.fixedDonationMatching,
          };
        case "SET_CUSTOM_DONATION_MATCHING":
          return {
            ...prevState,
            customDonationMatching: action.customDonationMatching,
          };
        case "SET_OPENED_QF_EXPLAINER_FIRST_TIME":
          return {
            ...prevState,
            openedQfExplainerFirstTime: action.openedQfExplainerFirstTime,
          };
        default:
      }
    },
    {
      openModal: false,
      modalConfig: { type: "" },
      user: sessionStorage.getItem("user")
        ? JSON.parse(sessionStorage.getItem("user"))
        : null,
      token: "",
      backupBusinesses: [],
      businesses: [],
      selectedBusiness: null,
      searchText: "",
      donationAmount: 0,
      stripePromise: null,
      fixedDonationMatching: [0, 0, 0],
      customDonationMatching: [0],
      openedQfExplainerFirstTime: false,
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
                  const authToken = await FirebaseService.getAuthToken();
                  console.log("Auth Token", authToken);
                  WebService.loginUser(result.user.email, authToken)
                    .pipe(catchError((err) => of(`I caught: ${err}`)))
                    .subscribe(async (data) => {
                      if (data.ok) {
                        console.log("Success");
                        const user = await data.json();
                        console.log(user);
                        sessionStorage.setItem("user", JSON.stringify(user));
                        dispatch({
                          type: "SET_USER",
                          user,
                        });
                      } else {
                        console.error("Error", await data.json());
                      }
                    });
                } else {
                  console.error("Error", await data.json());
                }
              });
          } else {
            const authToken = await FirebaseService.getAuthToken();
            console.log("Auth Token", authToken);
            WebService.loginUser(result.user.email, authToken)
              .pipe(catchError((err) => of(`I caught: ${err}`)))
              .subscribe(async (data) => {
                if (data.ok) {
                  console.log("Success");
                  const user = await data.json();
                  console.log(user);
                  sessionStorage.setItem("user", JSON.stringify(user));
                  dispatch({
                    type: "SET_USER",
                    user,
                  });
                } else {
                  const error = await data.json();
                  alert.error(error.non_field_errors.join());
                }
              });
          }
          dispatch({ type: "TOGGLE_MODAL", openModal: false, modalConfig: {} });
        } catch (err) {
          alert.error(err.message);
        }
      },
      facebookSignIn: async (type: string) => {
        try {
          const result = await FirebaseService.signInSocial("facebook");
          console.log(result.user, result.token);
          if (type === "signUp") {
            WebService.postUser(transformToUserForServer(result.user))
              .pipe(catchError((err) => of(`I caught: ${err}`)))
              .subscribe(async (data) => {
                if (data.ok) {
                  console.log("Success");
                  const user = await data.json();
                  console.log(user);
                  const authToken = await FirebaseService.getAuthToken();
                  console.log("Auth Token", authToken);
                  WebService.loginUser(result.user.email, authToken)
                    .pipe(catchError((err) => of(`I caught: ${err}`)))
                    .subscribe(async (data) => {
                      if (data.ok) {
                        console.log("Success");
                        const user = await data.json();
                        console.log(user);
                        sessionStorage.setItem("user", JSON.stringify(user));
                        dispatch({
                          type: "SET_USER",
                          user,
                        });
                      } else {
                        console.log("Error", await data.json());
                      }
                    });
                } else {
                  console.error("Error", await data.json());
                }
              });
          } else {
            const authToken = await FirebaseService.getAuthToken();
            console.log(authToken);
            WebService.loginUser(result.user.email, authToken)
              .pipe(catchError((err) => of(`I caught: ${err}`)))
              .subscribe(async (data) => {
                if (data.ok) {
                  console.log("Success");
                  const user = await data.json();
                  console.log(user);
                  sessionStorage.setItem("user", JSON.stringify(user));
                  dispatch({
                    type: "SET_USER",
                    user,
                  });
                } else {
                  const error = await data.json();
                  alert.error(error.non_field_errors.join());
                }
              });
          }
          dispatch({ type: "TOGGLE_MODAL", openModal: false, modalConfig: {} });
        } catch (err) {
          console.error(err);
        }
      },
      logoutUser: async () => {
        sessionStorage.removeItem("user");
        history.push("/");
        await FirebaseService.logoutUser();
        dispatch({
          type: "SET_USER",
          user: null,
        });
      },
      updateUser: async (id: string, updatedUser: any) => {
        WebService.updateUser(id, updatedUser)
          .pipe(catchError((err) => of(`I caught: ${err}`)))
          .subscribe(async (data) => {
            if (data.ok) {
              console.log("Success");
              const user = await data.json();
              console.log(user);
              sessionStorage.setItem("user", JSON.stringify(user));
              dispatch({
                type: "SET_USER",
                user,
              });
            } else {
              console.error("Error", await data.json());
            }
          });
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
      getFixedClrMatchingAmount: (allMatchingArrays: Array<any>) => {
        console.log(allMatchingArrays);
        WebService.getClrMatchingAmount({
          clr_objs: allMatchingArrays,
        }).subscribe(async (data) => {
          if (data.ok) {
            const matching = await data.json();
            console.log("Matching", JSON.parse(matching).clr_data);
            dispatch({
              type: "SET_FIXED_DONATION_MATCHING",
              fixedDonationMatching: JSON.parse(matching).clr_data,
            });
          } else {
            console.error("Error", await data.json());
          }
        });
      },
      getCustomClrMatchingAmount: (allMatchingArrays: Array<any>) => {
        console.log(allMatchingArrays);
        WebService.getClrMatchingAmount({
          clr_objs: allMatchingArrays,
        }).subscribe(async (data) => {
          if (data.ok) {
            const matching = await data.json();
            console.log(
              "Matching",
              JSON.parse(matching).clr_data,
              allMatchingArrays
            );
            dispatch({
              type: "SET_CUSTOM_DONATION_MATCHING",
              customDonationMatching: JSON.parse(matching).clr_data,
            });
          } else {
            console.error("Error", await data.json());
          }
        });
      },
      setOpenedQfExplainerFirstTime: (openedQfExplainerFirstTime: boolean) => {
        dispatch({
          type: "SET_OPENED_QF_EXPLAINER_FIRST_TIME",
          openedQfExplainerFirstTime,
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
