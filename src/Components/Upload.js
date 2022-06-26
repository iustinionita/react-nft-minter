import { useContext, useState, useRef } from "react";
import PinataProvider from "./PinataContext";
import { useMetaMask } from "metamask-react";
import Web3Provider from "./Web3Context";
import ContractJSON from "../Config/ContractJson.json";
import Receipt from "./Receipt";

function Upload() {
  const [fileIPFS, setFileIPFS] = useState();
  const [NFTcid, setNFTcid] = useState();
  const [preview, setPreview] = useState();
  const [receipt, setReceipt] = useState(false); // FALSE IN PRODUCTION
  const [tx, setTx] = useState();
  const title = useRef();
  const description = useRef();
  const { pinata } = useContext(PinataProvider);
  const { web3 } = useContext(Web3Provider);
  const { status, chainId } = useMetaMask();

  function imgPreview() {
    const file = document.getElementById("file").files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //   console.log(file.name)
    fileReader.onloadend = (e) => {
      // console.log(e.target.result)
      setPreview(e.target.result);
    };
  }

  function uploadFile() {
    const fileData = new FormData();
    fileData.append("file", document.getElementById("file").files[0]);
    fileData.append("pinataOptions", '{"cidVersion": 1}');
    // OPTIONAL - Name your CID
    // fileData.append("pinataMetadata", `{"name": "${title.current.value}"}`);
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
      },
      data: fileData,
    };
    pinata(config)
      .then((promise) => promise)
      .then((res) => {
        setFileIPFS(res.data.IpfsHash);
        uploadJSON(res.data.IpfsHash);
      });
  }

  function uploadJSON(imgIpfs) {
    const JSONdata = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: title.current.value,
      },
      pinataContent: {
        name: title.current.value,
        description: description.current.value,
        image: "https://ipfs.io/ipfs/" + imgIpfs,
      },
    });
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_JWT}`,
      },
      data: JSONdata,
    };
    pinata(config)
      .then((promise) => promise)
      .then((res) => {
        console.log(res);
        setNFTcid(res.data.IpfsHash);
        blockChain(res.data.IpfsHash);
      });
  }

  function blockChain(cid) {
    const contract = new web3.eth.Contract(
      ContractJSON,
      "0x72fc0e2af831262c46a19a688c9b35c0c4053226"
    );
    const fee = web3.utils.toWei("0.01", "ether");
    // console.log(web3.eth)
    contract.methods
      .mintNFT(web3.eth.defaultAccount, cid)
      .send({ from: web3.eth.defaultAccount, value: fee })
      .then((receipt) => {
        setTx(receipt);
        console.log(receipt)
      });
  }

  function reset() {
    setFileIPFS(null); setNFTcid(null); setPreview(null); setTx(null); title.current.value = null; description.current.value = null;
  }

  return (
    <>
      {(status === "connected") & (chainId === "0x61") && (
        <div className="upload">
          <input
            type="file"
            name="file"
            id="file"
            accept="image/png, image/gif, image/jpeg, image/jpg"
            onChange={() => {
              imgPreview();
            }}
          />
          <div className="file-upload-wrapper">
            <div className="file-upload inset">
              <div
                className="file-preview"
                style={{ backgroundImage: preview ? `url("${preview}")` : "" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("file").click();
                }}
              >
                <img
                  src={require("../Images/upload.png")}
                  alt="no-preview"
                  style={preview ? { display: "none" } : { display: "initial" }}
                />
                <p
                  style={preview ? { display: "none" } : { display: "initial" }}
                >
                  Upload your NFT image
                </p>
                {/* {fileIPFS ? <p>{fileIPFS}</p> : <p>NO IMAGE YET</p>} */}
              </div>
              <div className="metadata inset">
                <input
                  type="text"
                  name="title"
                  id="title"
                  ref={title}
                  placeholder="Title"
                  autoComplete="off"
                  required
                />
                <textarea
                  name="desc"
                  id="desc"
                  cols="30"
                  rows="5"
                  placeholder="NFT Description"
                  ref={description}
                ></textarea>
                {tx ?
                 <button
                 onClick={() => {
                   setReceipt(true)
                 }}
               >
                 Receipt
               </button>
                 :
                 <button
                 onClick={() => {
                   uploadFile();
                   setReceipt(true);
                 }}
               >
                 MINT
               </button>
                  }
                {/* <p className="reset" onClick={reset}>&#8635; RESET</p> */}
                {tx && <p className="reset" onClick={reset}>&#8635; RESET</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      <Receipt
        fileIPFS={fileIPFS}
        NFTcid={NFTcid}
        status={receipt}
        changeStatus={(receipt) => setReceipt(receipt)}
        preview={preview}
        title={title}
        description={description}
        tx={tx}
      />
    </>
  );
}

export default Upload;
