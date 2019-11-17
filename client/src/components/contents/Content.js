import React, { useContext } from 'react'
import CreateUniversityContent from './CreateUniversityContent';
import CreateRSO from './CreateRSO';
import './Content.css';
import { UsersContext } from '../../context';
import CreateEventContent from './CreateEventContent';
import Events from './Events';

const Content = (props) => {
    const usersContext = useContext(UsersContext);
    const { buttonClicked } = useContext(UsersContext);

    console.log(buttonClicked);
   
    return (
        <div className='content-container'>
            {buttonClicked === 'universityProfile' ? 
                <CreateUniversityContent /> 
                : buttonClicked === 'startRSO' ?
                <CreateRSO />
                : buttonClicked === 'createEvent' ?
                <CreateEventContent /> 
                : buttonClicked === 'discoverEvents' ?
                <Events />
                : <div></div>
                }
        </div>
    );
}

export default Content;