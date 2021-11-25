import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Fab, Typography } from '@mui/material'
import AuthContext from '../auth'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    let text ="";
    let newListButton = "";
    // TODO - add new list button for home screen, BUT LEAVE GRAYED OUT IF: GUEST BROWSING OR LIST BEING EDITED
    // TODO - conditional rendering for newlist button see above
    let editStatus = false;
    switch (store.currentView) {
        case "HOME_SCREEN":
            text = "Your Lists";
            newListButton = (
            <div>
                <Fab
                    aria-label="add"
                    size="medium"
                    variant="circular"
                    onClick={handleCreateNewList}
                    classList={editStatus ? "add-list-button-disabled disabled" : "add-list-button"} // if editStatus -> disable. Else, check if hasUndo -> ok else disable
                    disabled={editStatus ? true : false}
                >
                    <AddIcon />
                </Fab>
            </div>
            );
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
        default:
            break;
    }
    function handleCreateNewList() {
        store.createNewList();
    }
    
    return (
        <div id="top5-statusbar" style={{display: auth.loggedIn || auth.isGuest ? "" : "none"}}>
            {newListButton}
            <div>
                <Typography variant="h4">{text}</Typography>
            </div>
        </div>
    );
}

export default Statusbar;