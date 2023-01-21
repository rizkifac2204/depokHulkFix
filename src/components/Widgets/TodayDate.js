import React, { Component } from "react";
import moment from "moment";
import { Typography } from "@mui/material";

function TodayDate() {
  const currentDay = moment().format("Do MMMM");
  const todayDayName = moment().format("dddd");

  return (
    <div className="today-date sidebar-widget">
      <Typography variant="h4">{todayDayName}</Typography>
      <Typography variant="h4">{currentDay}</Typography>
    </div>
  );
}

export default TodayDate;
