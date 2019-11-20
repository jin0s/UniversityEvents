
import React, { useState } from 'react';
import './signup.css';
import HomeButton from '../components/buttons/homeButton';
import { assign_super_admins, getUniversityIdByName, signUp, studentOf } from '../utils/apiCalls'
import { display } from '@material-ui/system';

export default props => {
    const [selectedUserLevel, setSelectedUserLevel] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [university,setUniversity] = useState('');
    const [confPassword,setConfPassword] = useState('');
    const [name,setName] = useState('');

    const usernameHandler = username=>{
        setUsername(username);
    }
    const passwordHandler = password=>{
        setPassword(password);
    }
    const universityHandler = university=>{
        setUniversity(university);
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
            return;
        } else if (password.length < 4){
            alert("Your passwords must be atleast 4 characters long");
            return;
        }
        let data = await signUp(username,password,name);
        let universityData = await getUniversityIdByName(university);
        if (selectedUserLevel === 'super_admin') {
            let super_admin_data = await assign_super_admins(username);
            if (super_admin_data.status !== 0) {
                alert(data.error);
            }
        } else {
            studentOfHandler(username, universityData[0].id)
        }
        if(data.status === 0 && universityData.length !== 0){
            console.log("Sign up was successful");
            props.history.push("/");
        } else if (universityData.length === 0) {
            alert(university + " not found");
        } else {
            alert(data.error);
        }
    }
    
    const studentOfHandler = async(user_id, university_id) => {
        let data = await studentOf(user_id, university_id);
        if (data.status !== 0) {
            alert(data.error);
        }
    }
    return (
    <div className="AppSignUp">
        <div id="signUp">
            <h1> Sign Up </h1> 
            <label>User Role</label>
            <div className="userLevel" style={{paddingTop: '20px'}}>
                <ul>
                    <li>
                        <label>
                            <input
                            type="radio"
                            value="student"
                            checked={selectedUserLevel === 'student'}
                            onChange={ e => selectedUserLevelHandler(e.target.value)}
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
                            />
                            Super Admin
                        </label>
                    </li>
                </ul>
            </div>

            {
                selectedUserLevel === 'student'
                ? (
                    <div id="name_signUp">
                        University: 
                        <input onBlur= { e => universityHandler(e.target.value)}/>
                    </div>
                ):
                (
                    null
                )
            }
            <div className="signUpInfo" style={{paddingTop: '25px'}}>
                <div id="name_signUp">
                    <label>Name: </label>
                    <div>
                        <input class="effect-1" type="text" onBlur= { e => nameHandler(e.target.value)}/>
                    </div>
                </div>
                <div id="username_signUp" style={{paddingTop: '15px'}}>
                    <label >Username: </label>
                    <div>
                        <input type="text" onBlur= { e => usernameHandler(e.target.value)}/>
                    </div>
                </div>
                <div id="password_signUp" style={{paddingTop: '15px'}}>
                    <label>Password: </label>
                    <div>
                        <input type="text" type='password' onBlur= { e => passwordHandler(e.target.value)}/>
                    </div>
                </div>
                <div id="confirm_password_signUp" style={{paddingTop: '15px'}}>
                    <label>Retype Password: </label>
                    <div>
                        <input type='password' onBlur= { e => confPasswordHandler(e.target.value)}/>
                    </div>
                </div>
            </div>
            <button className="signUpButton" onClick={()=>signUpHandler()}> SIGN UP </button>
            <HomeButton className='signUpButton' path='/' {...props}>BACK</HomeButton>
        </div>
    </div>
    )
}