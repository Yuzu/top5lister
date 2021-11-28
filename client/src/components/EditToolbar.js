import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';

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

    function handlePublish(event) {
        // Publish then close list
        store.publish(store.currentList);
    }

    let editStatus = false;
    if (store.isItemEditActive || store.isListNameEditActive) {
        editStatus = true;
    }

    let canPublish = true; // change back to false after we ensure disabled if published!
    if (store.currentList) {
        let list = store.currentList;
        let seen = [];
        list.items.forEach((item) => {
            if (seen.includes(item.toLowerCase())) {
                canPublish = false;
            }
            else {
                seen.push(item.toLowerCase());
            }
        });

        if (list.items.includes("?")) {
            canPublish = false;
        }

        // currently searched lists for duplicate published names
        else if (store.originalLists.length !== 0) {
            store.originalLists.forEach((original) => {
                if (original.name.toLowerCase() === list.name && original.publishDate !== undefined) {
                    canPublish = false;
                }
            })
        }
        // check for duplicate published names everywhere
        else {
            store.lists.forEach((original) => {
                if (original.name.toLowerCase() === list.name && original.publishDate !== undefined) {
                    canPublish = false;
                }
            })
        }
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
                classList={editStatus ? "top5-button-disabled disabled" : canPublish ? "top5-button": "top5-button-disabled disabled"}
                disabled={editStatus ? true : canPublish ? false : true}
                color={canPublish ? "success" : "error" }
                onClick={handlePublish}
                id='publish-button'
                variant="contained">
                    PUBLISH
            </Button>
        </div>
    )
}

export default EditToolbar;