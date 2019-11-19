import React, { useState, useContext } from 'react'
import './SidebarContent.css';
import CreateEventContent from '../contents/CreateEventContent';
import { UsersContext } from '../../context';

const SidebarContent = () => {

  const usersContext = useContext(UsersContext);

  const { buttonClicked, setButtonClicked} = usersContext;
  const { showSidebar } = useContext(UsersContext);

  let content;
  let userLevel = '';

// TODO: Refactor this to use props instead of localstorage
  const superAdmin = localStorage.getItem('super_admin_id');
  const admin = localStorage.getItem('admin');

  if (superAdmin !== null) {
      userLevel = "Super Admin";
  } else if (admin !== null ) { 
      userLevel = "Admin";
  } else {
      userLevel = "Student"
  }

  if (userLevel === "Super Admin") {
    content = <div className="sidebar" id="superAdmin_sidebar">
      <ul>
        {/* Students can view events */}
        <li onClick={ e => setButtonClicked('discoverEvents')}><span>DISCOVER EVENTS</span></li>
        {/* Students can view events by location*/}
        <li onClick={ e => setButtonClicked('discoverEventsByLocation')}><span>DISCOVER EVENTS BY LOCATION</span></li>
          {/* Super admins can create profiles for a university*/}
        <li onClick={ e => setButtonClicked('universityProfile')}><span>CREATE AN UNIVERSITY PROFILE</span></li>
        {/* Events created without an RSO need to be approved by a super admin */}
        <li onClick={ e => setButtonClicked('manageEvents')}><span>MANAGE EVENTS</span></li>
      </ul>
  </div>
  } else if (userLevel === "Admin") {
    content = <div className="sidebar" id="admin_sidebar">
      <ul>
        {/* Students can view events */}
        <li onClick={ e => setButtonClicked('discoverEvents')}><span>DISCOVER EVENTS</span></li>
        {/* Students can view events by location*/}
        <li onClick={ e => setButtonClicked('discoverEventsByLocation')}><span>DISCOVER EVENTS BY LOCATION</span></li>
        {/* Admin  can  create  events */}
        <li onClick={ e => setButtonClicked('createEvent')}><span>CREATE AN EVENT</span></li>
        {/* Admin  change admins */}
        <li onClick={ e => setButtonClicked('manageRSO')}><span>MANAGE RSOs</span></li>
      </ul>
    </div>
  } else if (userLevel === "Student") {
    content =  <div className="sidebar" id="student_sidebar">
      <ul>
        {/* Students can view events */}
        <li onClick={ e => setButtonClicked('discoverEvents')}><span>DISCOVER EVENTS</span></li>
        {/* Students can view events by location*/}
        <li onClick={ e => setButtonClicked('discoverEventsByLocation')}><span>DISCOVER EVENTS BY LOCATION</span></li>
        {/* Students can join an existing RSO */}
        <li onClick={ e => setButtonClicked('joinRSO')}><span>JOIN AN RSO</span></li>
        {/* A student  user  can  request  to  create a  new  RSO  */}
        <li onClick={ e => setButtonClicked('startRSO')}><span>START AN RSO</span></li>
      </ul>
    </div>
  }

  return (
     <div className="sidebar-container" >
          {showSidebar ? 
          <div className="sidebar">
              {content}
          </div> 
          : <div></div>}
      </div>
  );
}

export default SidebarContent;