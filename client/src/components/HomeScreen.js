import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import AlertDialog from "./AlertDialog.js"

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

// TODO - rewrite this entire thing to fit the assignment.
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>
    }
    let editActive = store.isListNameEditActive;
    if (editActive) {
        return (
            <div id="top5-list-selector">
                <div id="list-selector-heading">
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    classList={"disabled"} disabled={true}
                >
                    <AddIcon />
                </Fab>
                    <Typography variant="h2">Your Lists</Typography>
                </div>
                <div id="list-selector-list">
                <AlertDialog />
                    {
                        listCard
                    }
                </div>
            
            </div>)
    }
    return (
        <div id="top5-list-selector">
            <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div>
            <div id="list-selector-list">
            <AlertDialog />
                {
                    listCard
                }
            </div>
        
        </div>)
}

export default HomeScreen;