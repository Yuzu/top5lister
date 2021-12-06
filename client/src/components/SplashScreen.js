import clipboardList from "../common/clipboardlist.svg"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../auth'

export default function SplashScreen() {

    let buttonStyle = {maxWidth: '140px', maxHeight: '60px', minWidth: '140px', minHeight: '60px'};
    const { auth } = useContext(AuthContext);
    return (
        <div id="splash-screen">
            <div style={{textDecorationLine: 'underline', fontSize:85}}>
                The Top 5 Lister
                <img src={clipboardList} alt="Top 5 Lister" width="75" height="75" />
            </div>
            
            <br/>
            <div style={{fontSize: 25}}>Create, Share, and View Top 5 Lists with a vast community of likeminded Top 5 Users!</div>
            <br />
            <br />
            <Stack id="splash-button-list" spacing={2} direction="column">
                <Link to="/register/"><Button className="splash-button" variant="contained" style={buttonStyle}>Create account</Button></Link>
                <Link to="/login/"><Button className="splash-button" variant="contained" style={buttonStyle}>Login</Button></Link>
                <Button className="splash-button" variant="contained" style={buttonStyle} onClick = {auth.browseAsGuest}>Continue as Guest</Button>
            </Stack>

            <div id="splash-footer" style={{fontStyle:"italic", fontSize:15}}>Created by Timothy Wu, CSE316 Fall '21</div>
        </div>
    )
}