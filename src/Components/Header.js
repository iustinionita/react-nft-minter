import { useContext, useEffect } from "react";
import Web3Context from "./Web3Context";
import { useMetaMask } from "metamask-react";

function Header() {
  const { web3 } = useContext(Web3Context);
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  useEffect(() => {
    web3.eth.defaultAccount = account;
    // eslint-disable-next-line
  }, [account]);

  async function changeChain() {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x61" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "BSC Testnet",
                nativeCurrency: {
                  name: "TBNB",
                  symbol: "TBNB",
                  decimals: 18,
                },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  return (
    <header>
      <div>
        <h1>
          MINT <br /> IT <br /> BIG
        </h1>
        <h2>Mint your own NFT on Binance Smart Chain (Testnet)</h2>
        {chainId !== "0x61" && (
          <p className="warning">
            Please use BSC Testnet network <br></br>{" "}
            <span onClick={changeChain}>Click HERE</span>
          </p>
        )}
      </div>
      {status === "connected" ? (
        <button style={{ backgroundColor: "#38e385" }}>Connected</button>
      ) : (
        <button
          onClick={() => {
            connect();
          }}
          style={{ backgroundColor: "#8338E3" }}
        >
          Connect
        </button>
      )}
    </header>
  );
}

export default Header;
