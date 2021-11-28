import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from '@mui/material/Link';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { list } = props;

    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }


    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    let isGuest = auth.isGuest;
    let upvoted = list.upvotes.includes(auth.user.username);
    let downvoted = list.downvotes.includes(auth.user.username);

    let published = list.publishDate === undefined ? false : true;
    let views = list.views !== undefined ? list.views : null;

    
    let community = false;
    if (list.pooledListNum) {
        community = true;
        published = true;
    }

    let deleteButton = "";

    // conditionally render if this list's owner is the currently logged in user
    if (auth.user !== null && auth.user.username === list.ownerUsername && !community) {
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
    if (published) {
        if (views === null) {
            views = 0;
        }
        viewComponent = (
            <Box height="30px" fontSize={16}>{"Views: " + views}</Box>
        )
    }

    let editComponent = "";
    if (!published && auth.user !== null && auth.user.username === list.ownerUsername) {
        editComponent = (
            <Link  sx={{cursor:"pointer", p: 1, flexGrow: 1}} fontSize={16} onClick={(event) => {handleLoadList(event, list._id)}} alignSelf='start'>Edit</Link>
        );
    }
    else if (community) {
        editComponent = (
            <Box height="30px" fontSize={16}>{"Updated at: " + list.updatedAt.split("T")[0]}</Box>
        )
    }
    else if (published) {
        editComponent = (
            <Box height="30px" fontSize={16}>{"Published: " + list.publishDate.split("T")[0]}</Box>
        )
    }
    else {
        editComponent = ""
    }


    let paddingBox = (<Box sx={{ p: 1 }} height="-250px" alignSelf='start' />);

    if (published) {
        paddingBox = <Box sx={{ p: 1 }} height="17px" alignSelf='start' />
    }

    let leftPadding = published ? "" : (<Box sx={{ p: 1 }} height="-250px" alignSelf='start' />)

    let expandButton = ""

    if (published) {
        expandButton = 
            (<Box height="20px" sx={{ p: 1 }} alignSelf='start'>
                <IconButton onClick={(event) => {
                    console.log("expand");
                    event.preventDefault();
                    event.stopPropagation();
                    store.expandListCard(list);
                    store.incrementViewCount(list);
                }} aria-label='open'>
                    <KeyboardArrowDownIcon style={{fontSize:'20pt'}} />
                </IconButton>
            </Box>);
    }

    let author = (<Box sx={{ p: 1, flexGrow: 1}} fontSize={16} alignSelf='start'>{"By: " + list.ownerUsername}</Box>);

    if (community) {
        author = "";
    }
    // TODO - if logged in, check for user's like/dislike status on this list and color one of the buttons accordingly.
    // If they click again on the previous vote then we just remove any votes
    // If they click on the opposite, get rid of old and change it.
    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{ marginTop: '15px', display: 'flex', flexDirection: "row", p: 1, bgcolor: published ? "#d4d4f5" : "#fffff1" }}
            style={{
                fontSize: '24pt',
                width: '100%',
                borderRadius: "15px"
            }}
        >       
            <Box style={{width: '400%'}}>
                <Box sx={{ p: 1, flexGrow: 1}} fontSize={24} alignSelf='start' >{list.name}</Box>
                {author}
                {editComponent}
            </Box>


            <Box style={{width: '70%'}}>
                <Box sx={{ p: 1 }} alignSelf='end' >
                    <IconButton disabled = {isGuest ? true : published ? false : true} color = {upvoted ? "success" : "inherit"} onClick={(event) => {
                        console.log("Upvote");
                        store.upvote(list);
                    }} aria-label='upvote'>
                        <ThumbUpOffAltIcon style={{fontSize:'20pt'}} />
                        
                    </IconButton>
                    {upvotes}
                    {leftPadding}
                </Box>
                {viewComponent}
            </Box>

            <Box style={{width: '70%'}}>
                <Box sx={{ p: 1 }} alignSelf='start'>
                    <IconButton disabled = {isGuest ? true : published ? false : true} color = {downvoted ? "error" : "inherit"}onClick={(event) => {
                        console.log("Downvote");
                        store.downvote(list);
                    }} aria-label='downvote'>
                        <ThumbDownOffAltIcon style={{fontSize:'20pt'}} />
                    </IconButton>
                    {downvotes}

                    {paddingBox}
                    
                </Box>
                
                
            </Box>
            
            <Box style={{width: '30%'}}>
                {deleteButton}
                {expandButton}
            </Box>

            
            
        </ListItem>


    return (
        cardElement
    );
}

export default ListCard;