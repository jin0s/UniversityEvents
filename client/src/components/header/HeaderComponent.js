import React, {useState} from 'react';
import './HeaderComponent.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SidebarContent from '../sidebar/SidebarContent';

const HeaderComponent = (props) => {

    const [showSidebar,setShowSidebar] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    const userLevel = "Admin";
 
    return (
        <div>
            <header className="header">
                <nav className="header_nav">
                    <div className="sidebar-icon">
                        <span onClick={toggleSidebar}>
                            {showSidebar ? <CloseIcon style={{color: '#DFE7F2'}} /> : <MenuIcon style={{color: '#DFE7F2'}} />}
                        </span>
                    </div>
                    <div className="spacer"></div>
                    <div lassName="header_nav_items">
                        <ul>
                            <li>{userLevel}</li>
                            <li><a href="/">Log Out</a></li>
                        </ul>
                    </div>
                </nav> 
            </header>
            <div>
                <SidebarContent showSidebar={showSidebar} userLevel={userLevel}/>
            </div>
        </div>
    );
}

export default HeaderComponent;