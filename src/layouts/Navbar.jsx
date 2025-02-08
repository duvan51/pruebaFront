import React from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdNightlight } from "react-icons/md";

const Navbar = (props) => {
 
  return (
    <div className={`w-100 bg-${props.mode} text-bg-${props.mode} d-flex justify-content-end`}>
      <div className="px-3 py-3 d-flex gap-4">
        
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={props.toggleMode}
            style={{cursor:"pointer", transform:"scale(1.5)" }}
          />
          
        </div>
        <div className="d-flex">
            <div className="d-flex" style={{ cursor: "pointer", fontSize: "24px" }}>
            {props.mode === "dark" ? <MdNightlight className="text-warning" /> : <MdOutlineLightMode className="text-primary" />}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
