import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

function ExpandedListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState();
    const { list } = props;

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            console.log("NEW COMMENT:");
            console.log(event.target.value);
            // TODO - handle processing comments
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

    if (true) { // todo - check for ownership of list and render conditionally
        deleteButton = (
            <Box sx={{ p: 1 }} alignSelf='end'>
                <IconButton onClick={(event) => {
                    console.log("A");
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
    if (true) { // TODO - check for views existing
        if (views === null) {
            views = 0;
        }
        viewComponent = (
            <Box height="30px" fontSize={16}>{"Views: " + views}</Box>
        )
    }

    let publishDate = "";
    if (true) { // TODO - change to checking for publishDate and change "today" to the actual date
        publishDate = (
            <Box height="30px" fontSize={16}>{"Published: " + "TODAY!"}</Box>
        );
    }
    // TODO - look at listcard conditional rendering/functions too! those mirror this closely.

    // TODO - look at list info: if we have a published date, then we render accordingly.
    // TODO - if logged in, check for user's like/dislike status on this list and color one of the buttons accordingly.
    // If they click again on the previous vote then we just remove any votes
    // If they click on the opposite, get rid of old and change it.
    // TODO - we might be able to just update locally then call updatelist on the api. Need to see if the token allows it.
    // TODO - this also applies to commenting! We would still need a view route to update.
    
    // No need to check for published status since it's a given here.
    let cardElement = (
            <ListItem
                id={list._id}
                key={list._id}
                sx={{ marginTop: '15px', display: 'flex', flexDirection: "row", p: 1, bgcolor: "#d4d4f5" }}
                style={{
                    fontSize: '24pt',
                    width: '100%',
                    borderRadius: "15px"
                }}
            >       
                <Box style={{width: '400%'}}>
                    <Box sx={{ p: 1, flexGrow: 1}} fontSize={24} alignSelf='start' >{list.name}</Box>
                    <Box sx={{ p: 1, flexGrow: 1}} fontSize={16} alignSelf='start'>{"By: " + list.ownerUsername}</Box>
                    <Box sx={{ p: 1 }} alignSelf='end'>
                        <List sx={{ width: '80%', left: '5%', bgcolor: '#2c2f70' }}>
                            {
                                <div>
                                    <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                                        {"1: \t" + list.items[0]}
                                    </ListItemText>

                                    <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                                        {"2: \t" + list.items[1]}
                                    </ListItemText>

                                    <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                                        {"3: \t" + list.items[2]}
                                    </ListItemText>

                                    <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                                        {"4: \t" + list.items[3]}
                                    </ListItemText>

                                    <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                                        {"5: \t" + list.items[4]}
                                    </ListItemText>
                                </div>
                            }
                        </List>
                    </Box>
                </Box>


                <Box style={{width: '70%'}}>
                    <Box sx={{ p: 1 }} alignSelf='end'>
                        <List sx={{bgcolor: '#2c2f70' }} id="list-comments">
                            {
                                list.comments.map((comment) => {
                                    return (
                                        <div float="left" width="100%"> {"\n" + comment.author + ": " + comment.content + "\n"}</div>
                                    );
                                })
                            }
                        </List>

                        <Box sx={{ p: 1 }} height="15px">
                            <TextField
                                margin="normal"
                                required
                                name="name"
                                placeholder="Make a comment!"
                                onKeyPress={handleKeyPress}
                                onChange={handleUpdateText}
                                defaultValue={text}
                                inputProps={{style: {fontSize: 24}}}
                                InputLabelProps={{style: {fontSize: 18}}}
                            />
                        </Box>
                    </Box>
                </Box>

                <Box style={{width: '100%', height:"253px"}}>
                <Box sx={{ p: 1 }} alignSelf='end'>
                        {viewComponent}
                        {publishDate}
                        <Box sx={{ p: 1 }} alignSelf='end' />
                        <IconButton onClick={(event) => {
                            console.log("Upvote");
                            // TODO - add Upvote functionality
                        }} aria-label='upvote'>
                            <ThumbUpOffAltIcon style={{fontSize:'20pt'}} />
                            
                        </IconButton>
                        {upvotes}
                    </Box>

                    <Box sx={{ p: 1 }} alignSelf='start'>
                        <IconButton onClick={(event) => {
                            console.log("Downvote");
                            // TODO - add downvote functionality
                        }} aria-label='downvote'>
                            <ThumbDownOffAltIcon style={{fontSize:'20pt'}} />
                        </IconButton>
                        {downvotes}
                        
                        {deleteButton}
                        <Box height="20px" sx={{ p: 1 }} alignSelf='start'>
                            <IconButton onClick={(event) => {
                                console.log("collapse");
                                event.preventDefault();
                                event.stopPropagation();
                                store.collapseListCard(list);
                            }} aria-label='close'>
                                <KeyboardArrowUpIcon style={{fontSize:'20pt'}} />
                            </IconButton>
                        </Box>

                        
                    </Box>
                    
                </Box>
                
                

            </ListItem>
        );
    

    return (
        cardElement
    );
}

export default ExpandedListCard;