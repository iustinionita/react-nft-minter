import { useMetaMask } from "metamask-react";

function SwitchChain() {
  const { chainId, ethereum } = useMetaMask();

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
    <>
      {chainId !== "0x61" && (
        <p className="warning">
          Wrong network <br></br>{" "}
          <span onClick={changeChain}>Click HERE</span>
        </p>
      )}
    </>
  );
}

export default SwitchChain;
