import React, { useEffect, useRef, useState } from 'react';
import './CreateUniversityContent.css';
import { createEvents, addLocation } from '../../utils/apiCalls';
import Geocode from "react-geocode";
import Map from '../maps/Map';


const CreateEventContent = ({ options, onMount, className }) => {
 
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
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [address, setAddress] = useState([]);
    const [location_name, setLocation_name] = useState([]);
    const [isMarkerShown, setIsMarkerShown] = useState('');
    let super_user_id = localStorage.getItem('super_admin_id');
    let admin = localStorage.getItem('admin');

    Geocode.setApiKey("AIzaSyB1CO8yPPEfqQ3HbUscpQu8FvbCFzj6klU");

    const setLatHandler = lat => {
        setLat(lat);
    }

    const setLngHandler = lng => {
        setLng(lng);
    }

    const setLocation_nameHandler = location_name => {
        setLocation_name(location_name);
    }

    const setIsMarkerShownHandler = isMarkerShown => {
        setIsMarkerShown(isMarkerShown);
    }

    const addressHandler = (location_address, location_city, location_state, location_zip) =>{
        setAddress([
            ...address,
            {
                location_address: location_address,
                location_city: location_city,
                location_state: location_state,
                location_zip: location_zip,
            }
        ]);
    }

    const showCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              setLatHandler(parseFloat(position.coords.latitude));
              setLngHandler(parseFloat(position.coords.longitude));
              setIsMarkerShownHandler(true);
            }
          );
          Geocode.fromLatLng(lat, lng).then(
            response => {
              let address = response.results[0].formatted_address.split(',');
              let stateAndZip = address[2].trim().split(' ');
              addressHandler(address[0].trim(), address[1].trim(), stateAndZip[0], stateAndZip[1]);
            },
            error => {
              console.log(error);
            }
          );
        } else {
          error => console.log(error)
        }
    }

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
          addLocationHandler();
          console.log(data);
          // TODO: navigate the just created event page
    }

    const addLocationHandler = async() => {
        let data = await addLocation(location_name, address[0].location_address, address[0].location_city, address[0].location_state, address[0].location_zip, lat, lng);
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

    useEffect(() => {
        showCurrentLocation();
    });

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
                    Event Type:
                    <select value={eventType} onChange={ e => eventTypeHandler(e.target.value)}>
                        <option value="public">
                            Public Event
                        </option>
                        <option value="private">
                            Private Event
                        </option>
                        <option value="rso">
                            Register Student Org Event
                        </option>
                    </select>
                </div>
                <div className="input">
                    RSO:
                    <input onBlur= { e => rsoHandler(e.target.value)} />
                </div>
                <div className="input">
                    Location Description:
                    <input onBlur= { e => setLocation_nameHandler(e.target.value)} />
                    <Map isMarkerShown={isMarkerShown} currentLocation={{lat: lat, lng: lng}}/>
                </div>
                <button className="submit" onClick={()=>createEventHandler()}> SUBMIT </button>
            </div>
        </div>
    );
}


export default CreateEventContent;

