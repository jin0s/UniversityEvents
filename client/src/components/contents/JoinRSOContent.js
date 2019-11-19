import React, { useState, useEffect } from 'react';
import { get_user_rso } from '../../utils/apiCalls';
import './CreateRSOContent.css';
import RSO from '../cards/RSO';

const JoinRSOContent = (props) => {

    let user_id = localStorage.getItem('user_id');

    const[rsos, setRsos] = useState([]);

    const RSOHandler = async() => {
        let result =  await get_user_rso(user_id);
        console.log('fetching RSOs', result[0]);
        setRsos(result[0]);
    }

    useEffect(()=>{//This will be executed always after the components have been rendered
        RSOHandler();
    },[]);
        
    return (
        <div className="joinRSOContainer">
            { 
                rsos.map((values) => {
                    return (
                        <RSO id={values.id} name={values.name} />
                    );
                })
            }
        </div>
    );
}

export default JoinRSOContent;