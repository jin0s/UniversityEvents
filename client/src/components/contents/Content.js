import React, { useContext } from 'react'
import CreateUniversityContent from './CreateUniversityContent';
import CreateRSO from './CreateRSO';
import './Content.css';
import { UsersContext } from '../../context';

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
                : <div></div>
                }
        </div>
    );
}

export default Content;