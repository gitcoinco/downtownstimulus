import { Observable, defer, from } from "rxjs";
import { mapToDonations, mapToBusinesses, mapToRound } from "../utils";
import { IBusiness } from "../models/Business";
import { IUser } from "../models/User";
import { IDonation } from "../models/Donations";
import { IRound } from "../models/Round";

const ROOT_URL = "https://api.downtownstimulus.com";

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
      fetch(`${ROOT_URL}/users/${id}/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Token ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        method: "GET",
      }).then((res) => res.json())
    );
  });
};

export const postUser = (user: any): Observable<any> => {
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

export const loginUser = (email: any, oauth_uuid: string): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/api-token-auth/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify({
          username: email,
          oauth_uuid,
        }),
      })
    );
  });
};

export const updateUser = (id: string, user: any): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/users/${id}/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Token ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        method: "PUT",
        body: JSON.stringify(user),
      })
    );
  });
};

export const fetchDonations = (): Observable<IDonation[]> => {
  return defer(() => {
    return from<Promise<IDonation[]>>(
      fetch(`${ROOT_URL}/donations/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Token ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then(mapToDonations)
    );
  });
};

export const getRound = (): Observable<IRound> => {
  return defer(() => {
    return from<Promise<IRound>>(
      fetch(`${ROOT_URL}/current_round/`)
        .then((res) => res.json())
        .then(mapToRound)
    );
  });
};

// export const postDonations = (donations: any): Observable<any> => {
//   return defer(() => {
//     return from<Promise<any>>(
//       fetch(`${ROOT_URL}/donations/`, {
//         headers: { "Content-Type": "application/json; charset=utf-8" },
//         method: "POST",
//         body: JSON.stringify(donations),
//       })
//     );
//   });
// };

export const getClrMatchingAmount = (
  donationsDetails: any
): Observable<any> => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/clramountaggregation/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: JSON.stringify(donationsDetails),
      })
    );
  });
};

export const getClientSecretKey = (
  amount: number,
  business_id: string,
  name: string,
  shipping_address: string,
  shipping_country: string
) => {
  return defer(() => {
    return from<Promise<any>>(
      fetch(`${ROOT_URL}/stripe_secret/`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Token ${
            JSON.parse(sessionStorage.getItem("user")).token
          }`,
        },
        method: "POST",
        body: JSON.stringify({
          amount,
          name,
          shipping_address,
          shipping_country,
          business_id,
        }),
      })
    );
  });
};
