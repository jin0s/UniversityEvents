import React, { useContext, useState, Component } from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { create_rso } from '../../utils/apiCalls';
import { create_admins } from '../../utils/apiCalls';
import './CreateRSO.css';

const CreateRSO = (props) => {

    const [selectedMembers, setselectedMembers] = useState('');
    const [name, setName] = useState('');
    const[listOpen, setListOpen] = useState(false);

    const selectedMembersHandler = members =>{
        
        setselectedMembers([
            ...selectedMembers,
            {
                members: members
            }
        ]);
       
        console.log(selectedMembers);
    }
    const NameHandler = name=>{
        setName(name);
        console.log(name);
    }

    const setListOpenHandler = ()=>{
        setListOpen(!listOpen);
    }

    // ** Needs to verify each memeber's eligibility in the system

    // const createRSOHandler = async() => {
    //     let admin_data = create_admins(user_id, university_id);
    //     if (admin_data.status === 0) {
    //         let data = await create_rso(username,password,name);
    //     }
       
    //     if (selectedUserLevel === 'super_admin') {
    //         let super_admin_data = await assign_super_admins(username);
    //         if (super_admin_data.status !== 0) {
    //             alert(data.error);
    //         }
    //     }
    //     if(data.status === 0){
    //         console.log("Sign up was successful");
    //         props.history.push("/");
    //     }
    //     else{
    //         alert(data.error);
    //     }
    // }
    
    return (
        <div className="createUniversityContainer">
            <form className="inputs">
                <ul>
                    <li>
                        <label>
                            Name: 
                            <input onBlur = { e => NameHandler(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Member 1:
                            <input onBlur = { e => selectedMembersHandler(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label style={{display: 'margin-right:10px'}}>
                            Member 2:
                            <input onBlur = { e => selectedMembersHandler(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Member 3:
                            <input onBlur = { e => selectedMembersHandler(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Member 4:
                            <input onBlur = { e => selectedMembersHandler(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <label>
                            Member 5:
                            <input onBlur = { e => selectedMembersHandler(e.target.value)}/>
                        </label>
                    </li>
                    <li>
                        <div className="dd-wrapper">
                            <div className="dd-header" onClick={()=>setListOpenHandler()}>
                            <div className="dd-header-title">Title</div>
                            {listOpen
                                ? <KeyboardArrowUpIcon />
                                : <KeyboardArrowDownIcon />
                            }
                            </div>
                            {listOpen && <ul className="dd-list" >
                            {selectedMembers.map((members)=> (
                                <li className="dd-list-item">{members.title}</li>
                            ))}
                            </ul>}
                        </div>
                    </li>
                 
                </ul>
                
                <button className="submit" > SUBMIT </button>
            </form>
        </div>
    );
}

export default CreateRSO;