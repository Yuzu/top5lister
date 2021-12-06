import React, { useContext, useEffect, useState} from 'react';
import { GlobalStoreContext } from '../store';
import ListCard from './ListCard.js';
import ExpandedListCard from "./ExpandedListCard.js";
import List from '@mui/material/List';
import AlertDialog from "./AlertDialog.js";
import AppBar from "./AppBar.js";
import AuthContext from '../auth'

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/

// TODO - rewrite this entire thing to fit the assignment.
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const[oldStore, updateStore] = useState(store);

    useEffect(() => {

        if (
            store.lists.length !== oldStore.lists.length ||
            store.expandedListCards.length !== oldStore.expandedListCards.length ||
            store.currentView !== oldStore.currentView ||
            store.searchQuery !== oldStore.searchQuery ||
            store.currentSort !== oldStore.currentSort
        ) {

            console.log("RE-LOADING LISTS DUE TO CHANGES");
            console.log("RE-RENDER");
            console.log("Previous:");
            console.log(oldStore);
            console.log("Now:");
            console.log(store);
            store.loadLists();
        }
        
        updateStore(store);
    }, [store]);

    useEffect(() => {
        console.log("INITIAL LOADING");
        if (auth.isGuest && store.currentView === "HOME_SCREEN") {
            store.allView();
            return;
        }
        store.loadLists();
    }, [])

    let listCard = "";
    // TODO - rewrite to account for open vs closed cards, as well as writing the code for the cards.
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', bgcolor: '#c4c4c4' }}>
            {
                store.lists.map((list) => {
                    if (store.expandedListCards.includes(list._id)) {
                        return (
                            <ExpandedListCard
                                key={list._id}
                                list={list}
                            />
                        );
                    }
                    else {
                        return (
                            <ListCard
                                key={list._id}
                                list={list}
                                selected={false}
                            />
                        );
                    }
                })
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