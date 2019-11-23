
import React, {useState} from 'react';
import { UsersContextProvider } from "../context";
import './home.css';
import Content from '../components/contents/Content';
import HeaderComponent from '../components/header/HeaderComponent'
import SidebarContent from '../components/sidebar/SidebarContent'

const home = (props) => {

    const showSidebar = false;
    const buttonClicked = '';

    return (
        <div className="AppHome">
            <UsersContextProvider showSidebar={showSidebar} >
                <HeaderComponent  history={props.history}/>
                <SidebarContent buttonClicked={buttonClicked}/>
                <main style={{marginTop: '64px'}}>
                    <Content buttonClicked={buttonClicked}/>
                </main>
            </UsersContextProvider>
        </div>
    );
}

export default home;