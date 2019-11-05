
import React, { useState } from 'react';
import './signup.css';
import HomeButton from '../components/buttons/homeButton';
import {signUp} from '../utils/apiCalls'
import {assign_super_admins} from '../utils/apiCalls'

export default props => {
    const [selectedUserLevel, setSelectedUserLevel] = useState('');
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
    const nameHandler = name=>{
        setName(name);
    }
    const selectedUserLevelHandler = selectedUserLevel=>{
        setSelectedUserLevel(selectedUserLevel);
    }

    const signUpHandler = async() => {
        if(password !== confPassword){ //If passwords don't match then dont make the api call
            alert("Your passwords don't match, please try again.");
        } 
        let data = await signUp(username,password,name);
        if (selectedUserLevel === 'super_admin') {
            let super_admin_data = await assign_super_admins(username);
            if (super_admin_data.status !== 0) {
                alert(data.error);
            }
        }
        if(data.status === 0){
            console.log("Sign up was successful");
            props.history.push("/");
        }
        else{
            alert(data.error);
        }
    }

    return (
    <div className="AppSignUp">
        <div id="signUp">
            <h1> SignUp </h1> 
            <div className="xc">
                User Role
                <ul>
                    <li>
                        <label>
                            <input
                            type="radio"
                            value="student"
                            checked={selectedUserLevel === 'student'}
                            onChange={ e => selectedUserLevelHandler(e.target.value)}
                            className="form-check-input"
                            />
                            Student
                        </label>
                    </li>
                    <li>
                        <label>
                            <input
                            type="radio"
                            value="super_admin"
                            checked={selectedUserLevel === 'super_admin'}
                            onChange={ e => selectedUserLevelHandler(e.target.value)}
                            className="form-check-input"
                            />
                            Super Admin
                        </label>
                    </li>
                </ul>
            </div>
            <div id="name_signUp">
                Name: 
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