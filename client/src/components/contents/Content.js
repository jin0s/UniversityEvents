import React, { useContext } from 'react'
import CreateUniversityContent from './CreateUniversityContent';
import CreateRSOContent from './CreateRSOContent';
import JoinRSOContent from './JoinRSOContent';
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
                <CreateRSOContent />
                : buttonClicked === 'startRSO' ?
                <JoinRSOContent/> 
                : null
                }
        </div>
    );
}

export default Content;