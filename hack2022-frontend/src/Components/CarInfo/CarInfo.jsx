// @ts-nocheck
import React, { useState } from "react";
import { CardBox } from "../CardBox/CardBox";
import { Htag } from "../Htag/Htag";
import styles from "./CarInfo.module.scss";

import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import video from "../../assets/video/video.mp4";
import { Search } from "../Search/Search";

import CircularProgress from "@mui/material/CircularProgress";

const CarInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen((state) => !state);
  };

  return (
    <div className={styles.container}>
      <CardBox className={styles.box1}>
        <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }}>
          <Htag tag={"h3"}>Видеоряд</Htag>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", margin: "0 -10px" }}>
          <CardBox className={styles.camera__item}>
            <div width={"100%"} height={"calc(100% /2)"} style={{ position: "relative" }}>
              <video style={{ position: "relative", zIndex: 1 }} preload="auto" autoPlay={true} width={"100%"} height={"100%"} muted>
                <source src={video} type="video/mp4" />
              </video>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", position: "absolute", zIndex: 0, top: "0", left: "0" }}>
                <CircularProgress size={"1.8rem"} />
              </Box>
            </div>
          </CardBox>
        </div>
      </CardBox>

      <CardBox className={styles.box2}>
        <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }}>
          <Htag tag={"h3"}>Список машин</Htag>
        </div>
        <Search />
        <div style={{ padding: "10px 0", overflowY: "auto", height: "80%" }}>
          <ListItem
            onClick={openHandler}
            component="div"
            disablePadding
            secondaryAction={
              <Tooltip title={"Машина на территорий"}>
                <Box aria-label="comment">
                  <CircleRoundedIcon sx={{ color: "red" }} />
                </Box>
              </Tooltip>
            }
          >
            <ListItemButton>
              <ListItemText primary={`р55н-59`} />
            </ListItemButton>
          </ListItem>
        </div>

        {isOpen && (
          <CardBox
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "#fff",
              borderRadius: "8px",
              opacity: 1,
            }}
          >
            <div style={{ position: "relative", width: "100%" }}>
              <Htag tag={"h3"}>р55н-59</Htag>
              <button onClick={openHandler} style={{ position: "absolute", right: 0, top: 1, background: "none" }}>
                х
              </button>
            </div>
            <p></p>
          </CardBox>
        )}
      </CardBox>
    </div>
  );
};

export default CarInfo;
