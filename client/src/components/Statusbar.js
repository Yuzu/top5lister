import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let text ="";

    switch (store.currentView) {
        case "HOME_SCREEN":
            text = "Your Lists";
            break;
        case "ALL_LISTS":
            text = store.searchQuery ? store.searchQuery + " Lists" : "All Lists";
            break;
        case "USER_LISTS":
            text = store.searchQuery ? store.searchQuery + "'s Lists" : "User Lists";
            break;
        case "COMMUNITY_LISTS":
            text = "Community Lists";
            break;
    }
    if (store.currentList)
        text = store.currentList.name;
    return (
        <div id="top5-statusbar" style={{display: auth.loggedIn || auth.isGuest ? "" : "none"}}>
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;