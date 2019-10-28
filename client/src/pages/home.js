
import React, {useState} from 'react';
import './home.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SidebarContent from '../components/sidebar/SidebarContent';
import Content from '../components/contents/Content';
import HeaderComponent from '../components/header/HeaderComponent'

export default props => {

    // const [showSidebar,setShowSidebar] = useState(false);

    // const toggleSidebar = () => setShowSidebar(!showSidebar);
 
    return (
        <div className="AppHome">
                <HeaderComponent />
                {/* <div className="sidebar-icon">
                    <span onClick={toggleSidebar}>
                        {showSidebar ? <CloseIcon /> : <MenuIcon/>}
                    </span>
                </div> */}
                <main style={{marginTop: '64px'}}>
                    <Content />
                </main>
                {/* <SidebarContent showSidebar={showSidebar} /> */}
                    
               
          
        </div>
    );
}
