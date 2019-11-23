import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Button } from 'reactstrap';
import { join_rso, leaveRSO, getRSOStatus } from '../../utils/apiCalls';
import './Card.css';
import JoinRSOContent from '../contents/JoinRSOContent';

const RSO = (props) => {

    let user_id = localStorage.getItem('user_id');

    const[status, setStatus] = useState('');

    const rsoStatusHandler = async(rso_id) => {
        let result =  await getRSOStatus(rso_id);
        console.log('fetching RSO status', result[0].status);
        setStatus(result[0].status === 1 ? 'active' : 'inactive');
    }

    const joinRSOHandler = async(rso_id, name) => {
        let result =  await join_rso(user_id, rso_id);
        rsoStatusHandler(rso_id);
        console.log('Join RSO response: ', result);
        alert("Joined RSO: " + name + " successfully");
    }

    const leaveRSOHandler = async(rso_id, name) => {
        let result =  await leaveRSO(user_id, rso_id);
        rsoStatusHandler(rso_id);
        console.log('Leave RSO response: ', result);
        alert("Left RSO: " + name + " successfully");
    }

    useEffect(()=>{//This will be executed always after the components have been rendered
        rsoStatusHandler(props.id);
    },[]);

    return (
        <div className='cardContainer' key={props.id} id={props.id}>
            <Card className='card' elevation={4}>
                <CardBody className='cardBody'>      
                    <div style={{top: '0', left: '0'}}>
                        <CardSubtitle className='cardTitle' tag="h2"> 
                            {props.name}
                        </CardSubtitle>
                        <p style={{textAlign: 'justify', textAlignLast: 'right'}}>
                            {status}
                        </p>
                    </div>             
                    <div style={{display: 'flex', flexDirection: 'row', paddingLeft: '270px'}}>
                        <Button className='button' onClick={()=>joinRSOHandler(props.id, props.name)} >Join</Button>
                        <Button className='button' onClick={()=>leaveRSOHandler(props.id, props.name)}>Leave</Button>
                    </div>
                </CardBody>             
            </Card>
        </div>
    );
};

export default RSO;
