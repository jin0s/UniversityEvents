import React, { useContext, useState } from 'react';
import './CreateUniversityContent.css';
import { createEvents } from '../../utils/apiCalls'

const CreateEventContent = (props) => {
 
    const [id, setId] = useState('');
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [description, setDescription] = useState(''); 
    const [contact_phone, setContactPhone] = useState('');
    const [email, setContactEmail] = useState('');
    const [rso, setRSO] = useState('');
    const [eventType, setEventType] = useState('');
    let super_user_id = localStorage.getItem('super_admin_id');
    let admin = localStorage.getItem('admin');

    const createEventHandler = async() => {
        let jsonBody = {
            "event_category": category,
            "name": name,
            "datetime": date + " " + time,
            "description": description,
            "contact_phone": contact_phone,
            "contact_email": email,
            "admin_id": admin,
            "rso_id": rso,
            "event_type": eventType
          }
          let data = await createEvents(jsonBody);
          console.log(data);
          // TODO: navigate the just created event page
    }

    const nameHandler = name=>{
        setName(name);
    }

    const dateHandler = date=>{
        setDate(date);
    }

    const timeHandler = time=>{
        setTime(time);
    }

    const descriptionHandler = description=>{
        setDescription(description);
    }

    const contactPhoneHandler = contact_phone=>{
        setContactPhone(contact_phone);
    }

    const contactEmailHandler = email=>{
        setContactEmail(email);
    }

    const rsoHandler = rso=>{
        setRSO(rso);
    }

    const eventTypeHandler = eventType=>{
        setEventType(eventType);
    }

    const setCategoryHandler = category=>{
        setCategory(category);
    }

    // TODO: create dropdown window dynamically using api calls
    return (
        <div className="createEventContainer">
            <div id="signUp">
                <div className="input">
                    Event Category: 
                    <select value={category} onChange={ e => setCategoryHandler(e.target.value)}>
                        <option value="1">
                            Social
                        </option>
                        <option value="2">
                            Fundraiser
                        </option>
                        <option value="3">
                            Informational
                        </option>
                        <option value="4">
                            General Body Meeting
                        </option>
                        <option value="5">
                            Networking
                        </option>
                    </select>
                </div>
                <div className="input">
                    Name: 
                    <input onBlur={ e => nameHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Date: 
                    <input onBlur={ e => dateHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Time: 
                    <input onBlur={ e => timeHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Description:
                    <input onBlur={ e => descriptionHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Contact Phone: 
                    <input onBlur={ e => contactPhoneHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Contact Email: 
                    <input onBlur={ e => contactEmailHandler(e.target.value)}/>
                </div>
                <div className="input">
                    RSO:
                    <input onBlur= { e => rsoHandler(e.target.value)} />
                </div>
                <div className="input">
                    Event Type:
                    <input onBlur= { e => eventTypeHandler(e.target.value)} />
                </div>
                <button className="submit" onClick={()=>createEventHandler()}> SUBMIT </button>
            </div>
        </div>
    );
}

export default CreateEventContent;

