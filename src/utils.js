import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';


export const getYear = date => {
  if (!date || date.length < 4) return 'N/A';
  return date.substr(0, 4);
};

export const MovieTime = num => {
  const hours = Math.floor(num / 60)
  const minutes = num % 60
  return `${hours}h ${minutes}m`
};

export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const generateConfig = (method, body) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return config;
};

export function SetDate () {
  const [date, setDate] = useState(new Date());

  const handleCalendarClose = () => console.log("Calendar closed");
  const handleCalendarOpen = () => console.log("Calendar opened");

  return (
    <DatePicker
      selected={date}
      onChange={date => setDate(date)}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
      dateFormat='dd/MM/yyyy'    
    />
  );
};