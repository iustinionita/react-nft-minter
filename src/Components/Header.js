import { useContext, useEffect } from "react";
import Web3Context from "./Web3Context";
import { useMetaMask } from "metamask-react";

function Header() {
  const { web3 } = useContext(Web3Context);
  const { status, connect, account, chainId } = useMetaMask();

  useEffect(() => {
    web3.eth.defaultAccount = account;
    // eslint-disable-next-line
  }, [account]);

  return (
    <header>
      <div>
      <h1>MINT <br /> IT <br /> BIG</h1>
      <h2>Mint your own NFT on Binance Smart Chain (Testnet)</h2>
      <p>
        Chain Id <strong>{chainId}</strong>
      </p>
      </div>
      {status === "connected" ? (
        <button style={{backgroundColor: '#38e385'}}>Connected</button>
      ) : (
        <button
          onClick={() => {
            connect();
          }}
          style={{backgroundColor: '#8338E3'}}
        >
          Connect
        </button>
      )}
      {/* <p>
        Wallet connected: <strong>{account}</strong>
      </p> */}
      
    </header>
  );
}

export default Header;
