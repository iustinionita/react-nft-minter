import loader from "../Media/loader.svg";
import previewLoader from "../Media/preview-loader.svg";

function Receipt(props) {
  return (
    <>
      {props.status && (
        <div className="receipt-wrapper">
          <div className="receipt">
            <h1>RECEIPT</h1>
            <div className="receipt-metadata">
              <h5>
                <span>Image IPFS</span>
                <p>
                  {props.fileIPFS ? (
                    props.fileIPFS
                  ) : (
                    <img src={loader} alt="loader" />
                  )}
                </p>
              </h5>
              <h5>
                <span>Metadata IPFS</span>
                <p>
                  {props.NFTcid ? (
                    props.NFTcid
                  ) : (
                    <img src={loader} alt="loader" />
                  )}
                </p>
              </h5>
            </div>
            <div className="receipt-preview">
              <img src={props.tx ? props.preview : previewLoader} />
              <ul>
                <li>
                  <h5>
                    {props.tx ? props.tx.gasUsed + "Gwei" : "loading"}
                    <span>Gas Used</span>
                  </h5>
                </li>
                <li>
                  <h5>
                    {props.tx ? props.tx.transactionHash.slice(0, 7) +
                      "..." +
                      props.tx.transactionHash.slice(
                        props.tx.transactionHash.length - 7,
                        props.tx.transactionHash.length
                      ) : "loading"}
                    <span>Tx Hash</span>
                  </h5>
                </li>
                <li>
                  <h5>
                    {props.tx ? props.tx.events.Transfer.returnValues.tokenId : 'loading'}
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
