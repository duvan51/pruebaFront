import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { MdAddAPhoto } from "react-icons/md";

const CameraComponent = ({ onCapture, mode }) => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const [show, setShow] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    onCapture(imageSrc);
  };
  const clearImage = () => {
    setImage(null);
  };



  console.log(show)
  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        className={`btn ${mode === "dark" ? "btn-outline-primary" : "btn-primary"}`}
        onClick={() => setShow(true)}
      >
        <MdAddAPhoto />
      </button>

      <>
      {show && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Tomar foto
              </h1>
            </div>
            <div className="modal-body">
              <div>
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={400}
                  height={300}
                />
                
                {image && <img src={image} alt="Captura" className="mt-3 img-fluid" />}
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
                onClick={() => { 
                  clearImage(); 
                  setShow(false); 
                }}
                
              >
                Cerrar
              </button>
              <button className="btn btn-success mt-2" onClick={capture}>
                  Tomar Foto
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
    </>
  );
};

export default CameraComponent;
