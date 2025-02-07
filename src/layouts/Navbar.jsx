import React from "react";

const Navbar = (props) => {
 
  return (
    <div className={`w-100 bg-${props.mode} text-bg-${props.mode}`}>
      <div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onClick={props.toggleMode}
            style={{cursor:"pointer"}}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Mode Dark
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
