import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { useContext } from "react";
import AuthContext from '../auth'

export default function ActionAlerts(props) {

    const { auth } = useContext(AuthContext);
    
    const handleClose = () => {
        console.log("closing");
        auth.hideError();
    };

    let errorMsg = null;
    if (auth.error) {
      errorMsg = auth.errorMsg;
    }

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert
        severity={props.severity} 
        onClose={handleClose}
      >
        {errorMsg}
      </Alert>
    </Stack>
  );
}