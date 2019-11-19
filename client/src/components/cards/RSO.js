import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { join_rso } from '../../utils/apiCalls';
import './Card.css';

const RSO = (props) => {

    let user_id = localStorage.getItem('user_id');

    const joinRSOHandler = async(rso_id) => {
        let result =  await join_rso(user_id, rso_id);
        console.log('Join RSO response: ', result);
    }

    return (
        <div className='cardContainer' key={props.id} id={props.id}>
            <Card className='card' elevation={4}>
                <CardBody className='cardBody'>                   
                    <CardSubtitle className='cardTitle' tag="h2"> 
                        {props.name}
                    </CardSubtitle>
                    <Button className='button' onClick={()=>joinRSOHandler(props.id)} >Join</Button>
                </CardBody>             
            </Card>
        </div>
    );
};

export default RSO;
