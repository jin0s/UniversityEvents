import React, { Component, useState, useEffect} from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { manageEvents } from '../../utils/apiCalls';
import './Card.css';

const PublicEventCard = (props) => {

    const commentsHandler = async(approved) => {
        console.log("event id: " + props.id);
        console.log("approved: " + approved);
        let result =  await manageEvents(approved, props.id) 
        if (result.status === 0 && approved === 1) {
            alert("The event is approved.");
        } else if (result.status === 0 && approved === 1) {
            alert("The event is declined.");
        }
        console.log(result);
    }

    return (
        <div className='cardContainer' id={props.id} >
            <Card className='card' elevation={4} >
                <CardBody className='cardBody'>
                    <CardTitle className='cardTitle' tag="h1"> 
                        {props.name}
                    </CardTitle>
                    <CardText className='cardText' tag="p">
                        {props.description}
                        {props.contact_phone}
                        {props.contact_email}
                        {props.event_type}
                    </CardText>
                    <div className="cardSmall">
                        <small>
                            {props.datetime}
                        </small>
                       
                        <button 
                            style={{marginLeft: '55%'}} 
                            className="button"
                            onClick={()=>commentsHandler(1)}
                        > 
                            APPROVE 
                        </button>
                        <button 
                            className="button"
                            onClick={()=>commentsHandler(0)}
                        > 
                            DECLINE 
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default PublicEventCard;