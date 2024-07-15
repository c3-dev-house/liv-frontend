import React from "react";
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomAlert = ({ alertOpen, setAlertOpen, severity, message, additionalMessage }) => {
  return (
    <Collapse in={alertOpen}>
      <Alert
        severity={severity}
        sx={{ margin: "16px 0" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setAlertOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message} {additionalMessage && `. ${additionalMessage}`}
      </Alert>
    </Collapse>
  );
};

export default CustomAlert;
