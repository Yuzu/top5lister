import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from '@mui/material/Link';

// TODO - rewrite this into the closed listcard. also need to write openlistcard.
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { list } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }


    // TODO - don't render button at all if published
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let published = list.publishDate === undefined ? false : true;
    let views = list.views !== undefined ? list.views : null;

    let deleteButton = "";

    if (true) { // TODO - conditionally render if this list's owner is the currently logged in user.
        deleteButton = (
            <Box sx={{ p: 1 }} alignSelf='end'>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, list._id)
                }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'20pt'}} />
                </IconButton>
            </Box>
        );
    }

    let upvotes = 0;
    let downvotes = 0;
    if (published) {
        upvotes = list.upvotes.length;
        downvotes = list.downvotes.length;
    }

    let viewComponent = "";
    if (true) { // TODO - change to if (published) | only published list can have views
        if (views === null) {
            views = 0;
        }
        viewComponent = (
            <Box height="30px" fontSize={16}>{"Views: " + views}</Box>
        )
    }

    let editComponent = "";
    if (true) { // TODO - change to if (!published) | published list cannot be edited
        editComponent = (
            <Link sx={{ p: 1, flexGrow: 1}} fontSize={16} onClick={(event) => {handleLoadList(event, list._id)}} alignSelf='start'>Edit</Link>
        );
    }
    // TODO - ELSE WE SHOW THE PUBLISH DATE

    // TODO - disable/enable voting depending on publish status
    // TODO - call viewupdate endpoint if viewing a published list
    // TODO - look at list info: if we have a published date, then we render accordingly.
    // TODO - if logged in, check for user's like/dislike status on this list and color one of the buttons accordingly.
    // If they click again on the previous vote then we just remove any votes
    // If they click on the opposite, get rid of old and change it.
    // TODO - we might be able to just update locally then call updatelist on the api. Need to see if the token allows it.
    // TODO - this also applies to commenting! We would still need a view route to update.
    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{ marginTop: '15px', display: 'flex', flexDirection: "row", p: 1, bgcolor: published ? "#d4d4f5" : "#fffff1" }}
            button
            onClick={(event) => {
                handleLoadList(event, list._id)
            }
            }
            style={{
                fontSize: '24pt',
                width: '100%',
                borderRadius: "15px"
            }}
        >       
            <Box style={{width: '400%'}}>
                <Box sx={{ p: 1, flexGrow: 1}} fontSize={24} alignSelf='start' >{list.name}</Box>
                <Box sx={{ p: 1, flexGrow: 1}} fontSize={16} alignSelf='start'>{"By: " + list.ownerUsername}</Box>
                {editComponent}
            </Box>


            <Box style={{width: '70%'}}>
                <Box sx={{ p: 1 }} alignSelf='end'>
                    <IconButton onClick={(event) => {
                        console.log("Upvote");
                        // TODO - add Upvote functionality
                    }} aria-label='upvote'>
                        <ThumbUpOffAltIcon style={{fontSize:'20pt'}} />
                        
                    </IconButton>
                    {upvotes}
                </Box>
                {viewComponent}
            </Box>

            <Box style={{width: '70%'}}>
                <Box sx={{ p: 1 }} alignSelf='start'>
                    <IconButton onClick={(event) => {
                        console.log("Downvote");
                        // TODO - add downvote functionality
                    }} aria-label='downvote'>
                        <ThumbDownOffAltIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    {downvotes}
                </Box>
                
                <Box sx={{ p: 1 }} height="15px" alignSelf='start' />
            </Box>
            
            <Box style={{width: '30%'}}>
                {deleteButton}
                <Box height="20px" sx={{ p: 1 }} alignSelf='start'>
                    <IconButton onClick={(event) => {
                        console.log("collapse");
                        event.preventDefault();
                        event.stopPropagation();
                        store.expandListCard(list);
                    }} aria-label='close'>
                        <KeyboardArrowDownIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                </Box>
            </Box>

            
            
        </ListItem>


    return (
        cardElement
    );
}

export default ListCard;