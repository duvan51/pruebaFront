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
        <div className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
          
        >
          <div className="modal-dialog" role="document">
          <div 
               className={`modal-content bg-${mode} text-bg-${mode} `}
          style=
          {mode === "dark" ? { backgroundColor: "#5F6368", border: "none"} : {backgroundColor: "white"}}
          >
            <div className="modal-header d-flex align-items-center justify-content-center">
              <h1 
              id="staticBackdropLabel"
              className={` ${mode === "dark" ? "modal-title fs-5 .text-light" : "modal-title fs-5 .text-dark"}`}
              >
                Tomar foto
              </h1>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center justify-content-center">
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
                onClick={capture}
                className={`btn mt-2  ${mode === "dark" ? "btn-outline-success" : "btn-success"}`}
              >
                  Tomar Foto
              </button>
              <button 
                type="button" 
                className={`btn  ${mode === "dark" ? "btn-outline-secondary " : "btn-secondary "}`}
                data-bs-dismiss="modal"
                onClick={() => { 
                  clearImage(); 
                  setShow(false); 
                }}
                
              >
                Cerrar
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
