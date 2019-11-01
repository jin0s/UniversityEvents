import React, { useState, useContext } from 'react'
import './SidebarContent.css';
import CreateEventContent from '../contents/CreateEventContent';
import { UsersContext } from '../../context';

const SidebarContent = () => {

  let userLevel = '';

  const superAdmin = localStorage.getItem('super_admin_id');

  if (superAdmin !== null) {
      userLevel = "Super Admin";
  } else {
      userLevel = "Student"
  }
  
  const [showCreatEventForm, setShowCreatEventForm] = useState(false);
  const toggleCreatEventForm = () => setShowCreatEventForm(!showCreatEventForm);
  const { showSidebar } = useContext(UsersContext);
  let content;
  let main;

  if (userLevel === "Super Admin") {
    content = <div className="sidebar" id="superAdmin_sidebar">
      <ul>
          {/* Super admins can create profiles for a university*/}
        <li><a>CREATE AN UNIVERSITY PROFILE</a></li>
        {/* Events created without an RSO need to be approved by a super admin */}
        <li><a>MANAGE EVENTS</a></li>
      </ul>
  </div>
  } else if (userLevel === "Admin") {
    content = <div className="sidebar" id="admin_sidebar">
      <ul>
        {/* Admin  can  create  events */}
        <li onClick={()=>toggleCreatEventForm()}>CREATE AN EVENT</li>
      </ul>
    </div>
  } else if (userLevel === "Student") {
    content =  <div className="sidebar" id="student_sidebar">
      <ul>
        {/* Students can view events */}
        <li><a>DISCOVER EVENTS</a></li>
        {/* Students can join an existing RSO */}
        <li><a>JOIN AN RSO</a></li>
        {/* A student  user  can  request  to  create a  new  RSO  */}
        <li><a>START AN RSO</a></li>
      </ul>
    </div>
  }

  if (showCreatEventForm === true) {
    main = <CreateEventContent showCreatEventForm={showCreatEventForm} />
  }

  return (
     <div className="sidebar-container" >
          {showSidebar ? 
          <div className="sidebar">
              {content}
          </div> 
          : <div></div>}
          <main style={{marginTop: '64px'}}>
              {main}
          </main>
      </div>
  );
}

export default SidebarContent;