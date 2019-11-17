import React, { useContext, useState, Component } from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { create_rso } from '../../utils/apiCalls';
import { create_admins } from '../../utils/apiCalls';
import { getUserById } from '../../utils/apiCalls';
import './CreateRSO.css';

const CreateRSO = (props) => {

    const [selectedMembers, setselectedMembers] = useState([]);
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState('');
    const[listOpen, setListOpen] = useState(false);

    const university_id = localStorage.getItem('university_id');
    console.log('university_id: ' + university_id);

    const selectedMembersHandler = id =>{
        checkUserExists(id);
        setselectedMembers([
            ...selectedMembers,
            {
                id: id
            }
        ]);
        
    }
    const NameHandler = name=>{
        setName(name);
    }

    const setListOpenHandler = ()=>{
        setListOpen(!listOpen);
    }

    const listItems = selectedMembers.map((member, index) =>
        <li key={index} value={member.id} onClick={()=>setAdmin(member.id)} > 
            {member.id}
        </li> 

    );

    const checkUserExists = async(id) => {
        let data = await getUserById(id);
        if (data.length === 0) {
            alert('User ' +  id + ' does not exist.');
        }
        return data;
    };

    const createRSOHandler = async() => {
        // let admin_data = create_admins(user_id, university_id);
        console.log('hi');
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
            <div className="inputs">
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
                        <label>
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
                            <div className="dd-header" onClick={()=>setListOpenHandler()} style = {{width:"200px"}}>
                                <div className="dd-header-title">Admin</div>
                                    {listOpen
                                        ? <KeyboardArrowUpIcon />
                                        : <KeyboardArrowDownIcon />
                                    }
                            </div>
                                {
                                    listOpen
                                    ? (
                                        <ul>
                                            {listItems} 
                                        </ul>
                                    ):
                                    (
                                        null
                                    )
                                }
                            </div> 

                    </li>
                 
                </ul>
                
                <button className="createRSO" onClick={()=>createRSOHandler()}> SUBMIT </button>
            </div>
        </div>
    );
}

export default CreateRSO;