// @ts-nocheck
import React, { useState } from "react";
import { CardBox } from "../CardBox/CardBox";
import { Htag } from "../Htag/Htag";
import styles from "./CarInfo.module.scss";

import Box from "@mui/material/Box";
import video from "../../assets/video/video.mp4";
import { Search } from "../Search/Search";

import CircularProgress from "@mui/material/CircularProgress";
import { CarDescription } from "./CarDescription/CarDescription";
import { ListItemCar } from "./ListItemCar/ListItemCar";

const CarInfo = () => {
  const [selectedCarNumber, setSelectedCarNumber] = useState("");
  const cars = [
    { carNumber: "р55н-59", color: "red" },
    { carNumber: "а84а-33", color: "green" },
  ];

  const closeHandler = () => {
    setSelectedCarNumber("");
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
          {cars.map(({ carNumber, color }) => (
            <ListItemCar
              key={carNumber}
              carNumber={carNumber}
              color={color}
              openHandler={() => {
                setSelectedCarNumber(carNumber);
              }}
            />
          ))}
        </div>

        {selectedCarNumber ? <CarDescription closeHandler={closeHandler} carNumber={selectedCarNumber} /> : <></>}
      </CardBox>
    </div>
  );
};

export default CarInfo;
