import { useState } from "react";

export const dFlexCol = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  alignItems: "flex-start",
};
export const labelStyle = {
  padding: "10px",
  textAlign: "center",
  fontSize: "12px",
};

// myFunctionalComponent
export const SizedBox = ({ w, h }) => {
  const boxStyle = { height: h || "auto", width: w || "auto" };
  return <div style={boxStyle}></div>;
};

// export const contacts = [
//   { id: "1", name: "John", email: "john@example.com" },
//   { id: "2", name: "Visio", email: "visio@exam.com" },
//   { id: "3", name: "Sunny", email: "sunny@ample.com" },
// ];
