import React from "react";
import "./DataTable.css"; // Make sure to import the CSS

const DataTable = ({ data, columns }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  return (
    <div className="data-table-sec">
      <table className="custom-data-table">
        <thead>
          <tr>
            <th>S.No</th>
            {columns.map((col, index) => (
              <th key={index}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {getValue(row, col.field)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
