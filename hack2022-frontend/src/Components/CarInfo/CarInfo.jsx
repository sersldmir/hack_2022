import React, {useState} from "react";
import styles from './CarInfo.module.scss';
import { CardBox } from "../CardBox/CardBox";
import {Htag} from '../Htag/Htag';

import Box  from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import { Search } from "../Search/Search";
import video from '../../assets/video/video.mp4'


const CarInfo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openHeandler = () => {
    setIsOpen(state => !state)
  }

  return <div className={styles.container}>
    <CardBox className={styles.box1}>
      <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.15)'}}>
        <Htag tag={'h3'}>Видеоряд</Htag>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', margin: '0 -10px'}}>
        <CardBox className={styles.camera__item}>
          <video 
            autoPlay={true}
            width={'100%'}
            height={'calc(100% /2)'}
            muted
          >
            <source src={video} type="video/mp4"/>
          </video>
        </CardBox>

      </div>
    </CardBox>

    <CardBox className={styles.box2}>
      <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.15)'}}>
        <Htag tag={'h3'}>Список машин</Htag>
      </div>
      <Search />
      <div style={{padding: '10px 0', overflowY: 'auto', height: '80%'}}>
          <ListItem 
            onClick={openHeandler}
            component="div" 
            disablePadding
            secondaryAction={
              <Tooltip title={'Машина на территорий'}>
                <Box aria-label="comment">
                  <CircleRoundedIcon sx={{color: 'red'}}/>
                </Box>
              </Tooltip>
            }
          >
          <ListItemButton>
            <ListItemText primary={`р55н-59`} />
          </ListItemButton>
        </ListItem>        
      </div>
      
      {isOpen && <CardBox style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: '#fff',
          borderRadius: '8px',
          opacity: 1,
        }}>
          <div style={{position: 'relative', width: '100%'}}>
            <Htag tag={'h3'}>р55н-59</Htag>
            <button onClick={openHeandler} style={{position: 'absolute', right: 0, top: 1, background: 'none'}}>х</button>
          </div>
          <p></p>

        </CardBox>}
    </CardBox>
  </div>;
};

export default CarInfo;
