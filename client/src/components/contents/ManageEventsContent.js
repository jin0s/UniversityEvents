import React, { useContext, useState, useEffect } from 'react';
import { getApproveEvents } from '../../utils/apiCalls';
import PublicEventsCard from '../cards/PublicEventsCard';

const ManageEventsContent = (props) => {
  const[events, setEvents] = useState([]);
  const[eventType, setEventType] = useState();

  let super_user_id = localStorage.getItem('super_admin_id');
  console.log("super_user_id: " + super_user_id);

  const eventsHandler = async() => {
      let result =  await getApproveEvents(super_user_id) 
      console.log('fetching events', result);
      setEvents(result);
  }

  const setEventTypeHandler = data=>{
    setEventType(data);
    eventsHandler(data);
    console.log(data);
}
  
    useEffect(()=>{//This will be executed always after the components have been rendered
        eventsHandler();
    },[]);

    return (
        <div className='Events'>
            <h1 style={{marginBottom: '2%'}}>Manage Events</h1>            
                {
                    events.map((value) => {
                        return (
                            <PublicEventsCard
                                        key={value.id} 
                                        id={value.id} 
                                        datetime={value.datetime}
                                        description={value.description}
                                        name={value.name}
                                        contact_phone={value.contact_phone}
                                        contact_email={value.contact_email}
                                        event_type={value.event_type}
                            />
                        );
                    })
                }
        </div>
    );
}

export default ManageEventsContent;
