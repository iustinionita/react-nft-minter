import { useRef } from "react";
import loader from "../Media/loader.svg";
import loader2 from "../Media/loader2.svg";
import previewLoader from "../Media/preview-loader.svg";

function Receipt(props) {
  const imgIpfs = useRef();
  const metaIpfs = useRef();

  function copy(el) {
    navigator.clipboard.writeText(el.current.innerText);
    console.log(el.current.innerText);
  }

  return (
    <>
      {props.status && (
        <div className="receipt-wrapper">
          <div className="receipt">
            <h1>RECEIPT</h1>
            <div className="receipt-metadata">
              <h5>
                <span onClick={() => copy(imgIpfs)}>Image IPFS</span>
                <p ref={imgIpfs}>
                  {props.fileIPFS ? (
                    props.fileIPFS
                  ) : (
                    <img src={loader} alt="loader" />
                  )}
                </p>
              </h5>
              <h5>
                <span onClick={() => copy(metaIpfs)}>Metadata IPFS</span>
                <p ref={metaIpfs}>
                  {props.NFTcid ? (
                    props.NFTcid
                  ) : (
                    <img src={loader} alt="loader" />
                  )}
                </p>
              </h5>
            </div>
            <div className="receipt-preview">
              <img
                src={props.tx ? props.preview : previewLoader}
                alt="receipt-loader"
              />
              <ul>
                <li>
                  <h5>
                    {props.tx ? (
                      props.tx.gasUsed + " Gwei"
                    ) : (
                      <img src={loader2} alt="receipt-loader" />
                    )}
                    <span>Gas Used</span>
                  </h5>
                </li>
                <li>
                  <h5>
                    {props.tx ? (
                      props.tx.transactionHash.slice(0, 7) +
                      "..." +
                      props.tx.transactionHash.slice(
                        props.tx.transactionHash.length - 7,
                        props.tx.transactionHash.length
                      )
                    ) : (
                      <img src={loader2} alt="receipt-loader" />
                    )}
                    {props.tx ? (
                      <a
                        href={`https://testnet.bscscan.com/tx/${props.tx.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>Tx Hash</span>
                      </a>
                    ) : (
                      <span>Tx Hash</span>
                    )}
                  </h5>
                </li>
                <li>
                  <h5>
                    {props.tx ? (
                      props.tx.events.Transfer.returnValues.tokenId
                    ) : (
                      <img src={loader2} alt="receipt-loader" />
                    )}
                    <span>NFT id</span>
                  </h5>
                </li>
              </ul>
            </div>
            <button onClick={() => props.changeStatus(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Receipt;
