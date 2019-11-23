import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { join_rso, leaveRSO } from '../../utils/apiCalls';
import './Card.css';

const RSO = (props) => {

    let user_id = localStorage.getItem('user_id');

    const joinRSOHandler = async(rso_id) => {
        let result =  await join_rso(user_id, rso_id);
        console.log('Join RSO response: ', result);
    }

    const leaveRSOHandler = async(rso_id) => {
        let result =  await leaveRSO(user_id, rso_id);
        console.log('Leave RSO response: ', result);
    }


    return (
        <div className='cardContainer' key={props.id} id={props.id}>
            <Card className='card' elevation={4}>
                <CardBody className='cardBody'>                   
                    <CardSubtitle className='cardTitle' tag="h2"> 
                        {props.name}
                    </CardSubtitle>
                    <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '270px'}}>
                        <Button className='button' onClick={()=>joinRSOHandler(props.id)} >Join</Button>
                        <Button className='button' onClick={()=>leaveRSOHandler(props.id)}>Leave</Button>
                    </div>
                </CardBody>             
            </Card>
        </div>
    );
};

export default RSO;
