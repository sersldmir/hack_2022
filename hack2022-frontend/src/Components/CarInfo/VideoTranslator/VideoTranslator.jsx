// @ts-nocheck
import { Box, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { CardBox } from "../../CardBox/CardBox";
import styles from "./VideoTranslator.module.scss";

export const VideoTranslator = ({ videoName }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <CardBox className={`${styles.camera__item} ${isClicked ? styles.camera__item_clicked : ""}`}>
      <div onClick={() => setIsClicked(!isClicked)} width={"100%"} height={"calc(100% /2)"} style={{ position: "relative" }}>
        <video style={{ position: "relative", zIndex: 1 }} preload="auto" autoPlay={true} width={"100%"} height={"100%"} muted>
          <source src={require(`../../../assets/video/${videoName}`)} type="video/mp4" />
        </video>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", position: "absolute", zIndex: 0, top: "0", left: "0" }}>
          <CircularProgress size={"1.8rem"} />
        </Box>
      </div>
    </CardBox>
  );
};
