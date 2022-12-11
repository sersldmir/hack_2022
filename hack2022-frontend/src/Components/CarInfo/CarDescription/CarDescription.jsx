// @ts-nocheck
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
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
        <Htag tag={"h2"}>{carNumber}</Htag>
        <IconButton onClick={closeHandler} disableTouchRipple sx={{ position: "absolute", right: "0", top: "-4px" }}>
          <CloseIcon />
        </IconButton>
      </div>
      <div style={{ height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
        <Htag tag={"h3"}>Информация о водителе</Htag>
        <Htag tag={"h3"}>Передвижение машины</Htag>
        <Htag tag={"h3"}>Посещение машины</Htag>
      </div>
    </CardBox>
  );
};
