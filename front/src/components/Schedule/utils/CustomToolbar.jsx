import React from "react";
import { addMonths, subMonths } from "date-fns";
import "./customtoolbar.css";

const CustomToolbar = ({ label, date, onNavigate }) => {
  return (
    <div className="custom-toolbar">
      <div className="toolbar-left">
        <button
          className="custom-btn"
          onClick={() => onNavigate('DATE', subMonths(date, 1))}
        >
          &#60;
        </button>
        <button
          className="custom-btn"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          className="custom-btn"
          onClick={() => onNavigate('DATE', addMonths(date, 1))}
        >
          &#62;
        </button>
      </div>
      <div className="toolbar-right">
        <span className="custom-toolbar-label">{label}</span>
      </div>
    </div>
  );
};

export default CustomToolbar;
