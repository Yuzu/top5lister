import { useContext, useState, useRef } from 'react'
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
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AuthContext from '../auth'

function ExpandedListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [text, setText] = useState();
    const { list } = props;
    const { auth } = useContext(AuthContext);

    let textInput = useRef(null);
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            event.stopPropagation();
            event.preventDefault();
            console.log("NEW COMMENT:");
            console.log(event.target.value);
            store.addComment(list, event.target.value);
            textInput.current.value = "";
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

    let deleteButton = "";

    if (auth.user !== null && auth.user.username === list.ownerUsername) { // todo - check for ownership of list and render conditionally
        deleteButton = (
            <Box sx={{ p: 1 }} alignSelf='end'>
                <IconButton onClick={(event) => {
                    handleDeleteList(event, list._id);
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

    let publishDate = "";
    if (published) {
        publishDate = (
            <Box height="30px" fontSize={16}>{"Published: " + list.publishDate.split("T")[0]}</Box>
        );
    }

    let community = false;

    let listItems = (
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
    );
    
    // community list
    if (list.pooledListNum) {
        community = true;
        published = true;
        upvotes = list.upvotes.length;
        downvotes = list.downvotes.length;
        views = list.views;
        deleteButton = "";
        viewComponent = (
            <Box height="30px" fontSize={16}>{"Views: " + views}</Box>
        );
        publishDate = (
            <Box height="30px" fontSize={16}>{"Updated at: " + list.updatedAt.split("T")[0]}</Box>
        );

        listItems = (
            <div>
                <ListItemText primaryTypographyProps={{fontSize: '18px', color: "#d4af37"}}>
                    {"Pooled From: " + list.pooledListNum + " lists!"}
                </ListItemText>

                <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                    {"1: \t" + list.items[0].name}
                </ListItemText>
                <ListItemText primaryTypographyProps={{fontSize: '15px', color: "#d4af37"}}>
                    {"(" + list.items[0].votes + " votes)"}
                </ListItemText>

                <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                    {"2: \t" + list.items[1].name}
                </ListItemText>
                <ListItemText primaryTypographyProps={{fontSize: '15px', color: "#d4af37"}}>
                    {"(" + list.items[1].votes + " votes)"}
                </ListItemText>

                <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                    {"3: \t" + list.items[2].name}
                </ListItemText>
                <ListItemText primaryTypographyProps={{fontSize: '15px', color: "#d4af37"}}>
                    {"(" + list.items[2].votes + " votes)"}
                </ListItemText>

                <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                    {"4: \t" + list.items[3].name}
                </ListItemText>
                <ListItemText primaryTypographyProps={{fontSize: '15px', color: "#d4af37"}}>
                    {"(" + list.items[3].votes + " votes)"}
                </ListItemText>

                <ListItemText primaryTypographyProps={{fontSize: '28px', color: "#d4af37"}}>
                    {"5: \t" + list.items[4].name}
                </ListItemText>
                <ListItemText primaryTypographyProps={{fontSize: '15px', color: "#d4af37"}}>
                    {"(" + list.items[4].votes + " votes)"}
                </ListItemText>
            </div>
        );
    }

    let author = (<Box sx={{ p: 1, flexGrow: 1}} fontSize={16} alignSelf='start'>{"By: " + list.ownerUsername}</Box>);

    if (community) {
        author = "";
    }
    // look at list info: if we have a published date, then we render accordingly.
    // TODO - if logged in, check for user's like/dislike status on this list and color one of the buttons accordingly.
    // If they click again on the previous vote then we just remove any votes
    // If they click on the opposite, get rid of old and change it.
    
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
                    {author}
                    <Box sx={{ p: 1 }} alignSelf='end'>
                        <List sx={{ width: '80%', left: '5%', bgcolor: '#2c2f70' }}>
                            {listItems}
                        </List>
                    </Box>
                </Box>


                <Box style={{width: '70%'}}  >
                    <Box sx={{ p: 1 }} alignSelf='end' id="list-comments">
                        <List >
                            {
                                list.comments.map((comment) => {
                                    return (
                                        <Card class="top5-comment" style={{backgroundColor: "#c6a433", marginBottom:"20px"}} variant="outlined">
                                            <CardContent >
                                                <Typography fontSize="20px" color="black" variant="caption" style={{textDecoration:"underline"}}>
                                                    {comment.author + ":"}
                                                </Typography>
                                                <Typography fontSize="25px" color="black" variant="body1">
                                                    {comment.content + "\n"}
                                                </Typography>
                                                
                                            </CardContent>
                                        </Card>
                                    );
                                })
                            }
                        </List>
                    </Box>
                    <Box sx={{ p: 1 }} height="15px" id="comment-input">
                            <TextField
                                disabled = {isGuest ? true : false}
                                margin="normal"
                                required
                                name="name"
                                placeholder="Make a comment!"
                                onKeyPress={handleKeyPress}
                                onChange={handleUpdateText}
                                inputRef={textInput}
                                inputProps={{style: {fontSize: 24}}}
                                InputLabelProps={{style: {fontSize: 18}}}
                            />
                    </Box>
                </Box>

                <Box style={{width: '100%', height:"253px"}}>
                <Box sx={{ p: 1 }} alignSelf='end'>
                        {viewComponent}
                        {publishDate}
                        <Box sx={{ p: 1 }} alignSelf='end' />
                        <IconButton disabled = {isGuest ? true : false} color = {upvoted ? "success" : "inherit"} onClick={(event) => {
                            console.log("Upvote");
                            store.upvote(list);
                        }} aria-label='upvote'>
                            <ThumbUpOffAltIcon style={{fontSize:'20pt'}} />
                            
                        </IconButton>
                        {upvotes}
                    </Box>

                    <Box sx={{ p: 1 }} alignSelf='start'>
                        <IconButton disabled = {isGuest ? true : false} color = {downvoted ? "error" : "inherit"} onClick={(event) => {
                            console.log("Downvote");
                            store.downvote(list);
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