import React, { Component } from 'react'
import './SidebarContent.css';

const SidebarContent = (props) => {

  const userLevel = props.userLevel;
  let content;

  if (userLevel == "Super Admin") {
    content = <div className="sidebar" id="superAdmin_sidebar">
      <ul>
          {/* Super admins can create profiles for a university*/}
        <li><a>CREATE AN UNIVERSITY PROFILE</a></li>
        {/* Events created without an RSO need to be approved by a super admin */}
        <li><a>MANAGE EVENTS</a></li>
      </ul>
  </div>
  } else if (userLevel == "Admin") {
    content = <div className="sidebar" id="admin_sidebar">
      <ul>
        {/* Admin  can  create  events */}
        <li><a>CREATE AN EVENT</a></li>
      </ul>
    </div>
  } else if (userLevel == "Student") {
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

  return (
     <div className="sidebar-container" >
          {props.showSidebar ? 
          <div className="sidebar">
              {content}
          </div> 
          : <div></div>}
      </div>
  );
}

export default SidebarContent;