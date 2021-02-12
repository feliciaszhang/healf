import React from "react";
import { Text, Link, Box } from "@chakra-ui/react";
import SpreadsheetComponent from "react-spreadsheet-component";

const Table: React.FC<{ data: string[] }> = ({ data }) => {
  var config = {
    rows: 5,
    columns: 8,
    // True if the first column in each row is a header (th)
    hasHeadColumn: true,
    // True if the data for the first column is just a string.
    // Set to false if you want to pass custom DOM elements.
    isHeadColumnString: true,
    // True if the first row is a header (th)
    hasHeadRow: true,
    // True if the data for the cells in the first row contains strings.
    // Set to false if you want to pass custom DOM elements.
    isHeadRowString: true,
    // True if the user can add rows (by navigating down from the last row)
    canAddRow: true,
    // True if the user can add columns (by navigating right from the last column)
    canAddColumn: true,
    emptyValueSymbol: '-',
    hasLetterNumberHeads: false
};
  return (
    <SpreadsheetComponent initialData={{rows: data}} config={config} spreadsheetId="1" />
  );
};

export default Table;
