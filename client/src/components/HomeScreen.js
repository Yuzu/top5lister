import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import List from '@mui/material/List';
import AlertDialog from "./AlertDialog.js";
import AppBar from "./AppBar.js";

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

// TODO - rewrite this entire thing to fit the assignment.
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    
    useEffect(() => {
        store.loadLists();
    }, []);

    let listCard = "";
    // TODO - rewrite to account for open vs closed cards, as well as writing the code for the cards.
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#c4c4c4' }}>
            {
                store.lists.map((list) => (
                    <ListCard
                        key={list._id}
                        list={list}
                        selected={false}
                    />
                ))
            }
            </List>
    }
    return (
        <div id="top5-list-selector">
            <AppBar />

            <div id="list-selector-list">
            <AlertDialog />
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;