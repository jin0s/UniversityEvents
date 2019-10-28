import React, { Component } from 'react'
import './SidebarContent.css';

export default class SidebarContent extends Component {
  renderLinks = () => {
    return <div className="sidebar">
        <ul>
          <li><a>Home</a></li>
          <li><a>About</a></li>
          <li><a>Contact</a></li>
        </ul>
    </div>
  }
  
  render() {
    console.log(this.props.showSidebar);
    return <div className="sidebar-container" >
        {this.props.showSidebar ? 
        <div className="sidebar">
            {this.renderLinks()}
        </div> 
        : <div></div>}
    </div>
  }
}