
import React, { useContext, useState } from 'react';
import './signup.css';
// import {signUp} from '../utils/apiCalls';
import HomeButton from '../components/buttons/homeButton';
// import PlaceHolder from '../components/header/profilePicPlaceholder.png';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';
// import AddIcon from '@material-ui/icons/Add';
// import { Card, CardBody, CardTitle, Button } from 'reactstrap';
// import Popup from "reactjs-popup";
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';

export default props => {
    // const {message} = useContext(FBContext); 
    console.log('props: ', props); 
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confPassword,setConfPassword] = useState('');
    const [name,setName] = useState('');

    const usernameHandler = username=>{
        setUsername(username);
    }
    const passwordHandler = password=>{
        setPassword(password);
    }
    const confPasswordHandler = confPassword=>{
        setConfPassword(confPassword);
    }

    const nameHandler = username=>{
        setName(name);
    }

    const signUpHandler = async(event) => {
        if(password !== confPassword){ //If passwords don't match then dont make the api call
            alert("Your passwords don't match, please try again.");
        }
        console.log(JSON.stringify({username: username, password: password, name: name}))
        fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify({username: username, password: password, name: name}),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(({status}) => {
          if (status === 0) {
            console.log("Sign up was successful");
            props.history.push("/");  
          } 
        })
        .catch(err => {
          console.error(err);
          alert('Error Signing up please try again');
        });
    }

    return (
    <div className="AppSignUp">
        <div id="signUp">
            <h1> SignUp </h1> 
            <div id="name_signUp">
                Display Name: 
                <input onBlur= { e => nameHandler(e.target.value)}/>
            </div>
            <div id="username_signUp">
                Username:
                <input onBlur= { e => usernameHandler(e.target.value)}/>
            </div>
            <div id="password_signUp">
                Password: 
                <input type='password' onBlur= { e => passwordHandler(e.target.value)}/>
            </div>
            <div id="confirm_password_signUp">
                Retype Password: 
                <input type='password' onBlur= { e => confPasswordHandler(e.target.value)}/>
            </div>
            <button className="signUp" onClick={()=>signUpHandler()}> SIGN UP </button>
            <HomeButton className='signUp' path='/' {...props}>BACK</HomeButton>
        </div>
    </div>
    )
}