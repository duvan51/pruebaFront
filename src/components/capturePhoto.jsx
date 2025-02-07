import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { MdAddAPhoto } from "react-icons/md";



const CameraComponent = ({onCapture, mode}) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    onCapture(imageSrc)
  };

 
  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        className={`
          ${mode === "dark" ? "btn btn-outline-primary" : "btn btn-primary"} 
      `}
      >
         <MdAddAPhoto />
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                
                
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                  height={300}
                />
                <button onClick={capture}>Tomar Foto</button>
                {image && <img src={image} alt="Captura" />}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Understood
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CameraComponent;
