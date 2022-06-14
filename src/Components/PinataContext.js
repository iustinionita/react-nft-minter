import { createContext } from "react";
import axios from "axios";

const PinataContext = createContext();

export function PinataProvider({ children }) {
  
    function pinata(config) {
    return axios(config)
      .then((promise) => promise)
      .then((res) => res);
  }

  return (
    <PinataContext.Provider value={{pinata}}>
      {children}
    </PinataContext.Provider>
  );
}

export default PinataContext;

//   const config = {
//     method: "get",
//     url: "https://api.pinata.cloud/data/pinList?status=pinned",
//     headers: {
//       Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
//     },
//   };
//   axios(config)
//     .then((promise) => promise)
//     .then((res) => console.log(res));
