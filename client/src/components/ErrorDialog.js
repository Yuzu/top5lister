import * as React from 'react';
import Dialog from '@mui/material/Dialog';

import Alert from "./Alert.js"

import { useContext } from "react";
import AuthContext from '../auth'

export default function ErrorDialog() {
  const { auth } = useContext(AuthContext);
  
  let errorMsg = null;
  if (auth.error) {
      errorMsg = auth.errorMsg;
  }

  
  let visible = !(errorMsg === null);
  
  return (
    <div >
      <Dialog
        open={visible}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="error"/>

      </Dialog>
    </div>
  );
}