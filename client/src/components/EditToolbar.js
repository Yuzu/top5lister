import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CloseIcon from '@mui/icons-material/HighlightOff';

// TODO - rewrite this to use publish/delete buttons.
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleClose() {
        store.closeCurrentList();
    }

    function handlePublish() {
        // Publish then close list
        store.closeCurrentList();
    }
    // TODO - add conditional checking for publishing
    // TODO - add publishing
    let editStatus = false;
    if (store.isItemEditActive || store.isListNameEditActive) {
        editStatus = true;
    }

    return (
        <div id="edit-toolbar">
            <Button
                classList={editStatus ? "top5-button-disabled disabled" : "top5-button"} // if editStatus -> disable. Else, check if hasUndo -> ok else disable
                disabled={editStatus ? true : false}
                onClick={handleClose}
                id='save-button'
                variant="contained">
                    SAVE
            </Button>
            <Button
                classList={editStatus ? "top5-button-disabled disabled" : "top5-button"}
                disabled={editStatus ? true : false}
                color="success" // TODO - conditional rendering based on whether can publish or not, if not then error color
                onClick={handlePublish}
                id='publish-button'
                variant="contained">
                    PUBLISH
            </Button>
        </div>
    )
}

export default EditToolbar;