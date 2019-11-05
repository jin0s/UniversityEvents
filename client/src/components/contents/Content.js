import React, { useContext } from 'react'
import CreateUniversityContent from './CreateUniversityContent'
import './Content.css'
import { UsersContext } from '../../context';

const Content = (props) => {
    const usersContext = useContext(UsersContext);
    const { buttonClicked } = useContext(UsersContext);

    console.log(buttonClicked);
    const contentHandler = buttonClicked => {
        if (buttonClicked === 'universityProfile') {
            <CreateUniversityContent />
        }
    
    }
   
    return (
        <div className='content-container'>
            <CreateUniversityContent />
        </div>
    );
}

export default Content;