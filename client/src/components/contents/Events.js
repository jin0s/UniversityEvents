import React, { useContext, useState, useEffect } from 'react';
import { getAllEventsByType } from '../../utils/apiCalls';
import EventCard from './EventCard';

const Events = (props) => {
  const[events, setEvents] = useState([]);
  let username = localStorage.getItem('username');
  let event_type = 'rso';


  const eventsHandler = async() => {
      let result =  await getAllEventsByType(username, event_type) 
      console.log(result);
      console.log('fetching posts', result);
      setEvents(result);
  }
  
  useEffect(()=>{//This will be executed always after the components have been rendered
    eventsHandler();
  },[]);


  // {
  //   "students": "c.le93@knights.ucf.edu",
  //   "id": 1,
  //   "name": "antisocial social event",
  //   "datetime": "2019-10-29T16:00:00.000Z",
  //   "description": "Anti Social Social Club (sometimes stylized as ASSC and AntiSocialSocialClub) is a streetwear brand founded by Neek Lurk,[1][2] who previously worked for Stussy as a social marketing manager..[3][4]The brand has collaborated with A Bathing Ape,[5] Dover Street Market,[6], Playboy,[7][8] and Hello Kitty.[9]",
  //   "contact_phone": "4075555050",
  //   "contact_email": "test@knights.ucf.edu",
  //   "event_type": "Social",
  //   "event_id": 1,
  //   "RSO_id": 1
  // }

    // TODO: create dropdown window dynamically using api calls
    return (
        <div className='Events'>DISCOVER SOME EVENTS
                {
                    events.map((value) => {
                        return (
                          <div className={value.id}>

                          </div>
                            // <EventCard  key={value.id} 
                            //             id={value.id} 
                            //             datetime={value.datetime}
                            //             description={value.description}
                            //             name={value.name}
                            //             contact_phone={value.contact_phone}
                            //             contact_email={value.contact_email}
                            //             event_type={value.event_type}
                            //             username={localStorage.getItem('username')}
                            //             RSO_id={value.RSO_id}  
                            // />
                        );
                    })
                }
        </div>
    );
}

export default Events;
