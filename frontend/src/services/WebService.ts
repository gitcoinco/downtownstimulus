import { Observable, defer, from } from "rxjs";
import { mapToDonations, mapToBusinesses, toUrlEncoded } from "../utils";
import { IBusiness } from "../models/Business";
import { IUser } from "../models/User";
import { IDonation } from "../models/Donations";

const ROOT_URL = "http://127.0.0.1:8000";

export const fetchAllBusinesses = (): Observable<IBusiness[]> => {
  return defer(() => {
    return from<Promise<IBusiness[]>>(
      fetch(`${ROOT_URL}/business/`)
        .then((res) => res.json())
        .then(mapToBusinesses)
    );
  });
};

export const fetchSingleBusiness = (id: string): Observable<IBusiness> => {
  return defer(() => {
    return from<Promise<IBusiness>>(
      fetch(`${ROOT_URL}/business/${id}/`).then((res) => res.json())
    );
  });
};

export const fetchUser = (id: string): Observable<IUser> => {
  return defer(() => {
    return from<Promise<IUser>>(
      fetch(`${ROOT_URL}/users/${id}/`).then((res) => res.json())
    );
  });
};

export const postUser = (user: any): Observable<any> => {
  console.log(user);
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/users/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(user),
      })
    );
  });
};

export const updateUser = (id: string, user: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/users/${id}/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "PUT",
        body: JSON.stringify(user),
      })
    );
  });
};

export const fetchDonations = (): Observable<IDonation[]> => {
  return defer(() => {
    return from<Promise<IDonation[]>>(
      fetch(`${ROOT_URL}/donations/`)
        .then((res) => res.json())
        .then(mapToDonations)
    );
  });
};

export const postDonations = (donations: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/donations/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(donations),
      })
    );
  });
};

export const getClrMatchingAmount = (
  donationsDetails: any
): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/clramountaggregation`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(donationsDetails),
      })
    );
  });
};

export const getClientSecretKey = (amount: number, stripeAccountId: string) => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`https://api.stripe.com/v1/payment_intents`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Stripe-Account": stripeAccountId,
          Authorization:
            "Bearer sk_test_51GqkJHIvBq7cPOzZGDx0sDolQSjRI8JxEaXCtv9OYAHyVmIFiOSD40ZLeUxrqbtQbVO1hZ2GyPLbahO0slTk05v900S87oiMhQ",
        },
        method: "POST",
        body: toUrlEncoded({
          "payment_method_types[]": "card",
          amount: amount,
          currency: "usd",
          description: "Software development services",
          "shipping[name]": "Jane",
          "shipping[address][line1]": "510 Townsend St",
          "shipping[address][postal_code]": 98140,
          "shipping[address][city]": "San Francisco",
          "shipping[address][state]": "CA",
          "shipping[address][country]": "US",
        }),
      })
    );
  });
};
