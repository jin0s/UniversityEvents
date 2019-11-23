import React, { useContext } from 'react';
import './HeaderComponent.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { UsersContext } from '../../context';

const HeaderComponent = (props) => {

    const usersContext = useContext(UsersContext);

    const { showSidebar, setShowSidebar} = usersContext;
    let userLevel = '';

    const superAdmin = localStorage.getItem('super_admin_id');
    const admin = localStorage.getItem('admin');

    if (superAdmin !== null) {
        userLevel = "Super Admin";
    } else if (admin !== null ) {
        userLevel = "Admin";
    }else {
        userLevel = "Student";
    }

    const handleLogout = async() =>{
        localStorage.clear();
        props.history.push("/");
    }
 
    return (
        <div>
            <header className="header">
                <nav className="header_nav">
                    <div className="sidebar-icon">
                        <span onClick={() => setShowSidebar(!showSidebar)}>
                            {showSidebar ? <CloseIcon style={{color: '#DFE7F2'}} /> : <MenuIcon style={{color: '#DFE7F2'}} />}
                        </span>
                    </div>
                    <div className="spacer"></div>
                    <div className="header_nav_items">
                        <ul>
                            <li><a>{userLevel}</a></li>
                            <li onClick={()=>handleLogout()}><a>Log Out</a></li>
                        </ul>
                    </div>
                </nav> 
            </header>
            {/* <div>
                <SidebarContent showSidebar={showSidebar} userLevel={userLevel}/>
            </div> */}
        </div>
    );
}

export default HeaderComponent;