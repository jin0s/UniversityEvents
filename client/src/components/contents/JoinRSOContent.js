import React, { useContext, useState, Component } from 'react';
import { get_user_rso } from '../../utils/apiCalls';
import './CreateRSOContent.css';

const JoinRSOContent = (props) => {

    let user_id = localStorage.getItem('user_id');

    const[rsos, setRsos] = useState([]);

    const RSOHandler = async() => {
        let result =  await get_user_rso(user_id);
        console.log(result);
        console.log('fetching RSOs', result);
        setRsos(result);
    }
        
    return (
        <div className="joinRSOContainer">
    
        </div>
    );
}

export default JoinRSOContent;