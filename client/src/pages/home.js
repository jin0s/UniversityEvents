
import React, {useState} from 'react';
import './home.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SidebarContent from '../components/sidebar/SidebarContent';
import Content from '../components/contents/Content';

export default props => {

    const [showSidebar,setShowSidebar] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);
 
    return (
        <div className="AppHome">
            
                <div className="sidebar-icon">
                    <span onClick={toggleSidebar}>
                        {showSidebar ? <CloseIcon /> : <MenuIcon/>}
                    </span>
                </div>
                <SidebarContent showSidebar={showSidebar} />
                <Content />
          
        </div>
    );
}
