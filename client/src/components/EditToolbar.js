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

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isItemEditActive) {
        editStatus = true;
    }
    let hasUndo = store.canUndo(); 
    let hasRedo = store.canRedo();
    return (
        <div id="edit-toolbar">
            <Button
                classList={editStatus ? "disabled" : hasUndo ? "" : "disabled"} // if editStatus -> disable. Else, check if hasUndo -> ok else disable
                disabled={editStatus ? true : hasUndo ? false : true}
                id='undo-button'
                onClick={handleUndo}
                variant="contained">
                    <UndoIcon />
            </Button>
            <Button
                classList={editStatus ? "disabled" : hasRedo ? "" : "disabled"}
                disabled={editStatus ? true : hasRedo ? false : true}
                id='redo-button'
                onClick={handleRedo}
                variant="contained">
                    <RedoIcon />
            </Button>
            <Button
                classList={editStatus ? "disabled" : ""}
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                variant="contained">
                    <CloseIcon />
            </Button>
        </div>
    )
}

export default EditToolbar;