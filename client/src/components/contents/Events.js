import React, { useContext, useState, useEffect } from 'react';
import { getAllEventsByType, getCommentsByEventId } from '../../utils/apiCalls';
import EventCard from '../cards/EventCard';
import setButtonClicked from '../sidebar/SidebarContent';

const Events = (props) => {
  const[events, setEvents] = useState([]);
  const[eventType, setEventType] = useState();

  let username = localStorage.getItem('username');

  const eventsHandler = async(event_type) => {
      let result =  await getAllEventsByType(username, event_type);
      console.log('fetching events', result);
      setEvents(result);
  }

  const setEventTypeHandler = data=>{
    setEventType(data);
    eventsHandler(data);
    console.log(data);
}
  
  useEffect(()=>{//This will be executed always after the components have been rendered
    eventsHandler("public");
  },[]);

    return (
        <div className='Events'>DISCOVER SOME EVENTS                    
            <select value={eventType} onChange={ e=> setEventTypeHandler(e.target.value)}>
                <option value="public">Public Events</option>
                <option value="private">Private Events</option>
                <option value="rso">RSO Events</option>
            </select>
                {
                    events.map((value) => {
                        return (
                            <EventCard  key={value.id} 
                                        id={value.id} 
                                        datetime={value.datetime}
                                        description={value.description}
                                        name={value.name}
                                        contact_phone={value.contact_phone}
                                        contact_email={value.contact_email}
                                        event_type={value.event_type}
                                        username={localStorage.getItem('username')}
                                        RSO_id={value.RSO_id}  
                            />
                        );
                    })
                }
        </div>
    );
}

export default Events;
