// @ts-nocheck
import React from "react";
import { CardBox } from "../../CardBox/CardBox";
import { Htag } from "../../Htag/Htag";

export const CarDescription = ({ closeHandler, carNumber }) => {
  return (
    <CardBox
      style={{
        position: "absolute",
        inset: 0,
        background: "#fff",
        borderRadius: "8px",
        opacity: 1,
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <Htag tag={"h3"}>{carNumber}</Htag>
        <button onClick={closeHandler} style={{ position: "absolute", right: 0, top: 1, background: "none" }}>
          х
        </button>
      </div>
      <p></p>
    </CardBox>
  );
};
