import React, { useEffect, useRef, useState } from 'react';
import './CreateRSOContent.css';
import { createEvents, addLocation, getRSOListForAdmin, cleanEvent } from '../../utils/apiCalls';
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
    const [rsoOption, setRsoOption] = useState([]);
    let super_user_id = localStorage.getItem('super_admin_id');
    let admin = localStorage.getItem('admin');

    Geocode.setApiKey("AIzaSyB1CO8yPPEfqQ3HbUscpQu8FvbCFzj6klU");

    const setLatHandler = lat => {
        setLat(lat);
    }

    const getrsoOptions = async(user_id) => {
        let result =  await getRSOListForAdmin(user_id);
        console.log('fetching avaiable rso: ', result);
        setRsoOption(result);
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
        if(data.status === "ERRORED") {
            alert('Failed to create event. There is already an event in this location and time');
            cleanEvent();
            return
        }
        // TODO: navigate the just created event page
    }

    const nameHandler = name=>{
        setName(name);
    }

    const dateHandler = date=>{
        console.log(date);
        setDate(date);
    }

    const timeHandler = time=>{
        console.log(time);
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
        console.log(rso);
        setRSO(rso);
    }

    const eventTypeHandler = eventType=>{
        setEventType(eventType);
    }

    const setCategoryHandler = category=>{
        setCategory(category);
    }

    useEffect(()=>{//This will be executed always after the components have been rendered
        getrsoOptions(admin);
      },[]);

    showCurrentLocation();

    // TODO: create dropdown window dynamically using api calls
    return (
        <div className="inputs">
            <div className="dropdown">
                    Event Category: 
                    <select value={category} onChange={ e => setCategoryHandler(e.target.value)}>
                        <option value=""></option>
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
            <ul>
                <li>
                    <label>
                        Name: 
                        <input type='text' onBlur = { e => nameHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Date: 
                        <input type='date' onBlur = { e => dateHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Time:
                        <input type='time' onBlur = { e => timeHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Description:
                        <input type='text' onBlur = { e => descriptionHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Contact Phone: 
                        <input type='text' onBlur = { e => contactPhoneHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Contact Email: 
                        <input type='text'onBlur = { e => contactEmailHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Event Type:
                        <select value={eventType} onChange={ e => eventTypeHandler(e.target.value)}>
                            <option value="">
                                
                            </option>
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
                    </label>
                </li>
                <li>
                    <label>
                        RSO:
                        <select value={rso} onChange={ e=> rsoHandler(e.target.value)}> 
                            <option value=""></option>
                            {rsoOption.map((value) => <option key={value.id} value={value.id}>{value.name}</option>)}
                        </select>
                    </label>
                </li>
                <li>
                    <label>
                        Location Description:
                        <input type='text' onBlur = { e => setLocation_nameHandler(e.target.value)}/>
                    </label>
                </li>
            </ul>
            <div className="map">
                <Map isMarkerShown={isMarkerShown} currentLocation={{lat: lat, lng: lng}}/>
            </div>
            
            <button className="button" onClick={()=>createEventHandler()}> SUBMIT </button>
        </div>
    );
}


export default CreateEventContent;

