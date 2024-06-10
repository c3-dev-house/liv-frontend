import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const ShowReservation = ({ reservation }) => {
  return (
    <Box sx={{ padding: "16px", textAlign: "left" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between",  }}>
        <Typography variant="body1">Location:</Typography>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        {reservation.location}
      </Typography>
        </Box>
      
      <Typography variant="body1" sx={{ marginTop: 1 }}>
        Contents:
      </Typography>
      <Grid container spacing={1} sx={{ marginTop: 1 }}>
        {reservation.contents.map((item, index) => (
          <React.Fragment key={index}>
            <Grid item xs={6}>
              <Typography variant="body2">
                {item.id} {item.title}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography variant="body2">R {Number(item.price).toFixed(2)}</Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography variant="body2" sx={{fontWeight: "bold"}}>Total amount payable</Typography>
        <Typography variant="body2" sx={{fontWeight: "bold"}}>
          R{" "}
          {reservation.contents
            .reduce((total, item) => total + Number(item.price), 0)
            .toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowReservation;
