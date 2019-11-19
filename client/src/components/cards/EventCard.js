import React, { Component, useState, useEffect} from 'react';
import Comment from '../contents/Comment';
import CommentButton from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Ratings from 'react-ratings-declarative';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { getCommentsByEventId, addComment } from '../../utils/apiCalls';
import './Card.css';

const EventCard = (props) => {
    const [commentBeingAdded,setCommentBeingAdded] = useState('');
    const [comments,setComments] = useState([]);
    const [likes,setLikes] = useState(props.num_likes); //useState(Math.floor(Math.random()*5)+1);
    const [rating,setRating] = useState(0);
    const {classes} = props;

    const likeHandler = async(data) => {
    }
    
    const ratingHandler = (data) => {
        setRating(data);
        console.log("rating: " + data);
    }

    const commentsHandler = async() => {
        console.log("calling comments for event: " + props.id);
        let result =  await getCommentsByEventId(props.id) 
        console.log(result);
        if(result!== null){
            setComments(result);
        }
    }

    const commentBeingAddedHandler = content =>{
        setCommentBeingAdded(content);//TODO
        console.log(content);
    }

    const addCommentHandler = async() =>{
        if(commentBeingAdded === ''){ //If passwords don't match then dont make the api call
            alert("Can't add an empty comment");
        }
        else{
            let result = await addComment(localStorage.getItem("user_id"), props.id, commentBeingAdded, rating);
            console.log("addComment Result" , result);
            alert("Thank you for the comment!");
            setCommentBeingAdded('');
            commentsHandler();
        }
    }

    const deleteHandler = async() => {
        // if (window.confirm('Are you sure you wish to delete this post?')){
        //     console.log("Delete confirmed");
        //     let result =  await deletePost(token, props.id).then(ble => ble) 
        //     console.log('Delete post response: ', result);
        //     window.location.reload();
        // }
    }

    useEffect(()=>{//This will be executed always after the components have been rendered
        commentsHandler();
    },[]);

    const ToggleContent = ({ toggle, content }) => {
        const [isShown, setIsShown] = useState(false);
        const hide = () => setIsShown(false);
        const show = () => setIsShown((!isShown && true) || (isShown && !true));
        
        return (
        <React.Fragment>
            {toggle(show)}
            {isShown && content(hide)}
        </React.Fragment>
        );
    };
    

    return (
        <div className='cardContainer' id={props.id} >
            <Card className='card' elevation={4} >
                <CardBody className='cardBody'>
                    <CardTitle className='cardTitle' tag="h1"> 
                        {props.name}
                        <Button close onClick={deleteHandler}/>
                    </CardTitle>
                    <CardText className='cardText' tag="p">
                        {props.description}
                    </CardText>
                    <small className="float-right text-muted">{props.start_time}</small>
                    <IconButton color="inherit">
                        <Badge badgeContent={likes} onClick={likeHandler} color="secondary">
                            <FavoriteIcon />
                        </Badge>
                    </IconButton>
            
                    <ToggleContent
                        toggle={show => <IconButton onClick={show}><CommentButton/></IconButton>}
                        content={hide => (
                            <div>
                                {
                                    comments.map((value) => {
                                            return (
                                                <Comment    key={value.id} 
                                                            id={value.id} 
                                                            name={value.user_id}
                                                            rating={value.rating}
                                                            time_created={value.timestamp}
                                                            username={value.user_id}  
                                                            content={value.description}
                                                />
                                        );
                                    })
                                }
                            </div>
                        )}
                    />
                    <div className='TextFieldContainer'>
                        <TextField 
                            className="textField"
                            id="textPopUp" 
                            fullWidth 
                            multiline
                            placeholder="Make a comment..." 
                            value={commentBeingAdded}
                            onChange= { e => commentBeingAddedHandler(e.target.value)}
                        /> 
                        <div className='rating' >
                            <Ratings
                                rating={rating}
                                widgetRatedColors="blue"
                                changeRating= {ratingHandler}
                            >
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                                <Ratings.Widget />
                            </Ratings>
                        </div>
                        <Button className='button' variant="primary" size="small" onClick={addCommentHandler}>
                            Comment
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default (EventCard);