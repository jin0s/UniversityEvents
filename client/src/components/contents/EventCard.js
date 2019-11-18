import React, { Component, useState, useEffect} from 'react';
// import {deletePost, addComment, grabAllComments} from '../../utils/apiCalls';
import Comment from './Comment';
import LikeButton from '@material-ui/icons/FavoriteBorder';
import CommentButton from '@material-ui/icons/Comment';
import styles from '../../styles/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {withStyles} from '@material-ui/core/styles';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';


const EventCard = (props) => {
    const [commentAdd,setCommentAdd] = useState('');
    const [comments,setComments] = useState([]);
    const [likes,setLikes] = useState(props.num_likes); //useState(Math.floor(Math.random()*5)+1);
    const [liked,setLiked] = useState(false);
    const {classes} = props;

    const likeHandler = async() => {
    //     liked ? setLiked(false) : setLiked(true)
    //     liked ? setLikes(likes-1) : setLikes(likes+1)
    }

    const commentAddHandler = content =>{
    //     setCommentAdd(content);//TODO
    //     console.log(content);
    }

    const addCommentHandler = async() =>{
        // if(commentAdd === ''){ //If passwords don't match then dont make the api call
        //     alert("Can't add an empty comment");
        // }
        // else{
        //     let result = await addComment(token, props.id, commentAdd);
        //     console.log("addComment Result" , result);
        //     if(result.error === ""){
        //         console.log("Comment added");
        //         window.location.reload();
        //     }
        //     else{
        //         alert(result.error);
        //     }
        // }
    }

    const deleteHandler = async() => {
        // if (window.confirm('Are you sure you wish to delete this post?')){
        //     console.log("Delete confirmed");
        //     let result =  await deletePost(token, props.id).then(ble => ble) 
        //     console.log('Delete post response: ', result);
        //     window.location.reload();
        // }
    }

    const ToggleContent = ({ toggle, content }) => {
        const [isShown, setIsShown] = useState(false);
        const hide = () => setIsShown(false);
        const show = () => setIsShown(true);
        
        return (
        <React.Fragment>
            {toggle(show)}
            {isShown && content(hide)}
        </React.Fragment>
        );
    };
    

    return (
        <div className={classes.event_div} id={props.id} >
            <Card className={classes.event_card} elevation={4} >
                <CardBody className={classes.event_card_body}>
                    <CardTitle className={classes.event_card_title} tag="h1"> 
                        {props.name}
                        <Button close onClick={deleteHandler}/>
                    </CardTitle>
                    <CardText className={classes.event_card_text} tag="p">
                        {props.description}
                    </CardText>
                    <small className="float-right text-muted">{props.start_time}</small>
                    <IconButton color="inherit">
                        <Badge badgeContent={likes} onClick={likeHandler} color="secondary">
                            <FavoriteIcon />
                        </Badge>
                    </IconButton>
            
                    {/* <ToggleContent
                        toggle={show => <IconButton onClick={show}><CommentButton/></IconButton>}
                        content={hide => (
                            <div>
                                {
                                    comments.map((value) => {
                                            return (
                                                <Comment    key={value.comment_id} 
                                                            id={value.comment_id} 
                                                            image_url={value.profile_pic_url}
                                                            name={value.display_name}
                                                            time_created={value.time_created}
                                                            username={value.username}  
                                                            content={value.content}
                                                />
                                        );
                                    })
                                }
                            </div>
                        )}
                    /> */}
                    <div className={classes.coment_input__button_wrap}>
                        <TextField 
                            className={classes.comment_input}
                            id="textPopUp" 
                            fullWidth 
                            multiline
                            placeholder="Make a comment..." 
                            onBlur= { e => commentAddHandler(e.target.value)}
                        /> 
                        <Button className={classes.comment_button} variant="primary" size="small" onClick={addCommentHandler}>
                            Comment
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default withStyles(styles)(EventCard);