import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

// TODO- rewrite this to only support text editing, nothing else.
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Top5Item(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [draggedTo, setDraggedTo] = useState(0);
    const [text, setText] = useState(props.text);

    function handleDragStart(event, targetId) {
        event.dataTransfer.setData("item", targetId);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        console.log("entering " + props.index);
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        console.log("leaving " + props.index);
        setDraggedTo(false);
    }

    function handleDrop(event, targetId) {
        event.preventDefault();
        let sourceId = event.dataTransfer.getData("item");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        setDraggedTo(false);

        console.log("handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")");

        // UPDATE THE LIST
        store.addMoveItemTransaction(sourceId, targetId);
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsItemEditActive();
        }
        console.log("newActive = " + newActive);
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            store.addUpdateItemTransaction(index, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let { index } = props;

    let itemClass = "top5-item";
    if (draggedTo) {
        itemClass = "top5-item-dragged-to";
    }

    let disabled = store.isItemEditActive;
    // This is the element being edited.
    if (editActive) {
        return (
            <TextField
                key={'itemkey-' + index}
                margin="normal"
                required
                fullWidth
                id={"top5-item-" + index}
                label="Top 5 Item"
                name="name"
                autoComplete="Top 5 Item Name"
                className={itemClass}
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={props.text}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
        )
    }
    // Rest of the elements are to be disabled while the target is being edited.
    else if (disabled) {
        return (
            <ListItem
                id={'item-' + (index+1)}
                key={'itemkey-' + index}
                className={itemClass}
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton classList={"disabled"} disabled={true} aria-label='edit'>
                    <EditIcon classList={"disabled"} disabled={true} style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1, flexGrow: 1 }}>{props.text}</Box>
            </ListItem>
    )
    }
    // else normal
    else {
        return (
            <ListItem
                id={'item-' + (index+1)}
                key={'itemkey-' + index}
                className={itemClass}
                onDragStart={(event) => {
                    handleDragStart(event, (index+1))
                }}
                onDragOver={(event) => {
                    handleDragOver(event, (index+1))
                }}
                onDragEnter={(event) => {
                    handleDragEnter(event, (index+1))
                }}
                onDragLeave={(event) => {
                    handleDragLeave(event, (index+1))
                }}
                onDrop={(event) => {
                    handleDrop(event, (index+1))
                }}
                draggable="true"
                sx={{ display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}}  />
                </IconButton>
            </Box>
                <Box sx={{ p: 1}}>{props.text}</Box>
            </ListItem>
    )
    }
}

export default Top5Item;