import React, { useContext, useState, useEffect } from 'react';
import {getRSOListForAdmin, getMemberByRSOID, changeAdmin, getAdminById} from '../../utils/apiCalls';
import EventCard from '../cards/EventCard';

const ManageRSO = (props) => {
  const[userOption, setUserOption] = useState([]);
  const[rsoOption, setRsoOption] = useState([]);
  const[user, setUser] = useState();
  const[rso, setRSO] = useState();

  let username = localStorage.getItem('username');

  const getrsoOptions = async(user_id) => {
    let result =  await getRSOListForAdmin(user_id);
    console.log('fetching avaiable rso: ', result);
    setRsoOption(result);
  }

  const setUserHandler = (data) => {
    console.log('setting user to: ' + data);
    setUser(data);
  }

  const setRSOHandler = async(data) => {
    setRSO(data);
    getMembers(data);
  }

  const getMembers = async(rso_id) => {
    let result =  await getMemberByRSOID(rso_id);
    console.log('fetching avaiable users: ', result);
    setUserOptionHandler(result);
  }

  const setUserOptionHandler = data=>{
    setUserOption(data);
    console.log(data);
    }

    const changeAdminHandler = async() => {
        if(rso === undefined || rso === "") {
          alert("You must select a user to transfer admin rights");
          return;
        } else if(user === undefined || username === undefined || user === "" || username === "" ) {
          alert("You must select a user to transfer admin rights");
          return;
        }
        let data = await changeAdmin(user, username, rso);
        console.log(data);
        if(data.status === "ERRORED") {
          alert("That user is already an admin, we cannot him an admin");
          window.location.reload();
        } else {
          let getAdminData = await getAdminById(username);
          console.log(getAdminData);
          if (getAdminData.length === 0) {
            localStorage.removeItem("admin");
          }
          window.location.reload();
        }
          
        
  }


  useEffect(()=>{//This will be executed always after the components have been rendered
    getrsoOptions(username);
  },[]);
  

    return (
        <div className='Events'>CHANGE ADMINISTRATOR                 
            <select value={rso} onChange={ e=> setRSOHandler(e.target.value)}> 
                <option value=""></option>
                {rsoOption.map((value) => <option key={value.id} value={value.id}>{value.name}</option>)}
            </select>
            <select value={user} onChange={ e=> setUserHandler(e.target.value)}>
              <option value=""></option>
                {userOption.map((value) => <option key={value.user_id} value={value.user_id}>{value.user_id}</option>)}
            </select>
            <button className="submit" onClick={()=>changeAdminHandler()}> SUBMIT </button>
        </div>
    );
}

export default ManageRSO;
