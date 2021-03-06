import { createContext } from "react";
import Web3 from "web3/dist/web3.min.js";

const Web3Context = createContext();

export function Web3Provider({ children }) {
  const web3 = new Web3(window.ethereum);

  return (
    <Web3Context.Provider value={{ web3 }}>
      {children}
    </Web3Context.Provider>
  );
}

export default Web3Context;