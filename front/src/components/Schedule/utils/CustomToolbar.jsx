import React from "react";
import { addMonths, subMonths } from "date-fns";

const CustomToolbar = ({ label, date, onNavigate }) => {
  return (
    <div className="rbc-toolbar custom-toolbar">
      <div className="custom-toolbar-buttons">
        <button
          className="custom-btn"
          onClick={() => onNavigate('DATE', subMonths(date, 1))}
        >
          {"<"}
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
          {">"}
        </button>
      </div>
      <span className="custom-toolbar-label">{label}</span>
    </div>
  );
};

export default CustomToolbar;
