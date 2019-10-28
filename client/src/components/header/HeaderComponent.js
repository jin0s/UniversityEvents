import React, {useState} from 'react';
import './HeaderComponent.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SidebarContent from '../sidebar/SidebarContent';

const HeaderComponent = (props) => {

    const [showSidebar,setShowSidebar] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);
 
    return (
        <div>
            {showSidebar ?
                <div>
                    <header className="header">
                        <nav className="header_nav">
                            {/* <div className="header_button"><a>THE LOGO</a></div> */}
                            <div className="sidebar-icon">
                                <span onClick={toggleSidebar}>
                                    {showSidebar ? <CloseIcon /> : <MenuIcon/>}
                                </span>
                            </div>
                            <div className="spacer"></div>
                            <div lassName="header_nav_items">
                                <ul>
                                    <li><a href="/">Log Out</a></li>
                                </ul>
                            </div>
                        </nav> 
                    </header>
                    <div>
                        <SidebarContent showSidebar={showSidebar} />
                    </div>
                </div>
                :  
                <header className="header">
                    <nav className="header_nav">
                        {/* <div className="header_button"><a>THE LOGO</a></div> */}
                        <div className="sidebar-icon">
                            <span onClick={toggleSidebar}>
                                {showSidebar ? <CloseIcon /> : <MenuIcon/>}
                            </span>
                        </div>
                        <SidebarContent showSidebar={showSidebar} />
                        <div className="spacer"></div>
                        <div lassName="header_nav_items">
                            <ul>
                                <li><a href="/">Log Out</a></li>
                            </ul>
                        </div>
                    </nav> 
            
                </header>
            }
        </div>
    );
}

export default HeaderComponent;