// src/components/ErrorComponent.js

import React from "react";
import { Alert } from "@mui/material";

const ErrorComponent = ({ errorMessage }) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};

export default ErrorComponent;
