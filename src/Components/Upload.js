import { useContext, useState, useRef } from "react";
import PinataProvider from "./PinataContext";

function Upload() {
  const [fileIPFS, setFileIPFS] = useState();
  const [preview, setPreview] = useState();
  const title = useRef();
  const description = useRef();
  const { pinata } = useContext(PinataProvider);

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
    fileData.append("pinataMetadata", `{"name": "${title.current.value}"}`);
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
      .then((res) => console.log(res));
  }

  return (
    <div className="upload">
      <input
        type="file"
        name="file"
        id="file"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        //   onChange={() => {uploadFile(); imgPreview()}}
        onChange={() => {
          imgPreview();
        }}
      />
      <div className="file-upload-wrapper">
        <div className="file-upload inset">
          <div
            className="file-preview inset"
            style={{ backgroundImage: `url("${preview}")` }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("file").click();
            }}
          >
            <img
              src={require("../Images/upload.png")}
              alt="no-image-preview"
              style={preview ? { display: "none" } : { display: "initial" }}
            />
            <p>Upload your NFT image</p>
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
            <textarea name="desc" id="desc" cols="30" rows="5" ></textarea>
            {/* <input
              type="text"
              name="desc"
              id="desc"
              ref={description}
              placeholder="Description"
              autoComplete="off"
              required
            /> */}
          </div>
        </div>
      </div>
      {/* <button onClick={() => console.log(file)}>Show file</button> */}
    </div>
  );
}

export default Upload;
