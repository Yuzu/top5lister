import clipboardList from "../common/clipboardlist.svg"
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

export default function SplashScreen() {

    let buttonStyle = {maxWidth: '140px', maxHeight: '60px', minWidth: '140px', minHeight: '60px'};
    // TODO - Add routing for continue as guest.
    return (
        <div id="splash-screen">
            <text style={{textDecorationLine: 'underline', fontSize:85}}>The Top 5 Lister</text>
            <img src={clipboardList} alt="Top 5 Lister" width="75" height="75" />
            <br/>
            <text style={{fontSize: 25}}>Create, Share, and View Top 5 Lists with a vast community of likeminded Top 5 Users!</text>
            <br />
            <br />
            <Stack id="splash-button-list" spacing={2} direction="column">
            <Link to="/register/"><Button class="splash-button" variant="contained" style={buttonStyle}>Create account</Button></Link>
            <Link to="/login/"><Button class="splash-button" variant="contained" style={buttonStyle}>Login</Button></Link>
            <Link to="/"><Button class="splash-button" variant="contained" style={buttonStyle}>Continue as Guest</Button></Link>
            </Stack>

            <text id="splash-footer" style={{fontStyle:"italic", fontSize:15}}>Created by Timothy Wu, CSE316 Fall '21</text>
        </div>
    )
}