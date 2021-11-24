import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState(store?.currentList?.name);

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        console.log("newActive = " + newActive);
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            // make this a undoable change.
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let list = null;
    if (store.currentList) {
        list = store.currentList;
    }

    let listName = 
            (<Box className="workspace-listname" sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'24pt'}} />
                </IconButton>
                {text}
            </Box>);


    if (editActive) {
        listName =
            (<TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + list._id}
                label="Top 5 List Name"
                name="name"
                autoComplete="Top 5 List Name"
                className='workspace-listname'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={text}
                inputProps={{style: {fontSize: 24}}}
                InputLabelProps={{style: {fontSize: 18}}}
                autoFocus
            />);
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">

            {listName}
            <div id="workspace-edit">
                
                <div id="edit-numbering">
                    
                    <div className="item-number"><Typography variant="h3">1.</Typography></div>
                    <div className="item-number"><Typography variant="h3">2.</Typography></div>
                    <div className="item-number"><Typography variant="h3">3.</Typography></div>
                    <div className="item-number"><Typography variant="h3">4.</Typography></div>
                    <div className="item-number"><Typography variant="h3">5.</Typography></div>
                </div>
                
                {editItems}
            </div>
        </div>
    )
}

export default WorkspaceScreen;