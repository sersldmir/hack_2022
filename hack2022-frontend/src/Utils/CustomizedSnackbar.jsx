// @ts-nocheck
import { Alert, Snackbar, } from "@mui/material";
import React, { forwardRef } from "react";



const SnackBarAlert = forwardRef(function SnackBarAlert(props, ref) {
  return <Alert elevation={6} ref={ref} {...props} />;
});
export const CustomizedSnackbar = ({ message, open, setOpen, autoHide, severity, originOfSnackbar }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <Snackbar anchorOrigin={originOfSnackbar} autoHideDuration={autoHide} open={open} onClose={handleClose}>
      <SnackBarAlert sx={{ fontSize: "1rem" }} onClose={handleClose} severity={severity}>
        {message}
      </SnackBarAlert>
    </Snackbar>
  );
};