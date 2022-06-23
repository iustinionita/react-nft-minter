import "./App.scss";
import "./_max1400.scss";
import "./_max1000.scss";
import "./_max600.scss";
import Header from "./Components/Header";
import Upload from './Components/Upload';
// import Receipt from "./Components/Receipt";
import { MetaMaskProvider } from "metamask-react";
import { Web3Provider } from "./Components/Web3Context";
import { PinataProvider } from "./Components/PinataContext";

function App() {
  return (
    <>
    <video id="background-video" src={require('./Media/background.mp4')} autoPlay muted></video>
      <Web3Provider>
        <MetaMaskProvider>
          <PinataProvider>
            <Header />
            <Upload />
            {/* <Receipt /> */}
          </PinataProvider>
        </MetaMaskProvider>
      </Web3Provider>
    </>
  );
}

export default App;
