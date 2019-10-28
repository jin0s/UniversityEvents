
import React, {useState} from 'react';
import './home.css';
import Content from '../components/contents/Content';
import HeaderComponent from '../components/header/HeaderComponent'

export default props => {
    return (
        <div className="AppHome">
                <HeaderComponent />
                <main style={{marginTop: '64px'}}>
                    <Content />
                </main>
        </div>
    );
}
