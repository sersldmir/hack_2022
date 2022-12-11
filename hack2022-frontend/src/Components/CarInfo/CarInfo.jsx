// @ts-nocheck
import React, { useMemo, useState } from "react";
import { CardBox } from "../CardBox/CardBox";
import { Htag } from "../Htag/Htag";
import styles from "./CarInfo.module.scss";

// import video from "../../assets/video/video.mp4";
import { Search } from "../Search/Search";

import { CarDescription } from "./CarDescription/CarDescription";
import { ListItemCar } from "./ListItemCar/ListItemCar";
import { VideoTranslator } from "./VideoTranslator/VideoTranslator";

const CarInfo = () => {
  const [selectedCarNumber, setSelectedCarNumber] = useState("");
  const cars = [
    { carNumber: "р55н-59", color: "red" },
    { carNumber: "а84а-33", color: "green" },
  ];

  const videoTranslators = [{ videName: "video.mp4" }, { videName: "video.mp4" }];

  const [searchInfo, setSearchInfo] = useState("");

  const filteredCars = useMemo(() => {
    return cars.filter((car) => car.carNumber.includes(searchInfo));
  }, [cars, searchInfo]);

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
          {videoTranslators.map((videoTranslator) => (
            <VideoTranslator videoName={videoTranslator.videName} />
          ))}
        </div>
      </CardBox>

      <CardBox className={styles.box2}>
        <div style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.15)" }}>
          <Htag tag={"h3"}>Список машин</Htag>
        </div>
        <Search setSearchInfo={setSearchInfo} />
        <div style={{ padding: "10px 0", overflowY: "auto", height: "80%" }}>
          {filteredCars.map(({ carNumber, color }) => (
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
