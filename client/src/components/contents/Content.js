import React, { useContext } from 'react'
import CreateUniversityContent from './CreateUniversityContent';
import CreateRSOContent from './CreateRSOContent';
import JoinRSOContent from './JoinRSOContent';
import EventsByLocation from './EventsByLocation';
import ManageRSO from './ManageRSO';
import './Content.css';
import { UsersContext } from '../../context';
import CreateEventContent from './CreateEventContent';
import Events from './Events';
import {getApproveEvents} from '../../utils/apiCalls';

const Content = (props) => {
    const usersContext = useContext(UsersContext);
    const { buttonClicked } = useContext(UsersContext);

    console.log(buttonClicked);
   
    return (
        <div className='content-container'>
            {buttonClicked === 'universityProfile' ? 
                <CreateUniversityContent /> 
                : buttonClicked === 'startRSO' ?
                <CreateRSOContent />
                : buttonClicked === 'createEvent' ?
                <CreateEventContent /> 
                : buttonClicked === 'discoverEvents' ?
                <Events />
                : buttonClicked === 'discoverEventsByLocation' ?
                <EventsByLocation />
                : buttonClicked === 'manageRSO' ?
                <ManageRSO />
                : <div></div>
                }
        </div>
    );
}

export default Content;