import React, { useContext, useState, Component } from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { getUserById, create_admins, create_rso } from '../../utils/apiCalls';
import './CreateRSOContent.css';

const CreateRSOContent = (props) => {

    const [selectedMembers, setselectedMembers] = useState([]);
    const [name, setName] = useState('');
    const [admin, setAdmin] = useState('');
    const[listOpen, setListOpen] = useState(false);

    const university_id = localStorage.getItem('university_id');

    const setAdminHandler = admin=>{
        setAdmin(admin);
        console.log("admin: " + admin);
    }

    const selectedMembersHandler = id =>{
        checkUserExists(id);
        setselectedMembers([
            ...selectedMembers,
            {
                id: id
            }
        ]);
        console.log(selectedMembers);
    }
    const NameHandler = name=>{
        setName(name);
    }

    // const setListOpenHandler = ()=>{
    //     setListOpen(!listOpen);
    // }

    const listItems = selectedMembers.map((member, index) =>
        <li key={index} value={member.id}>
            <a  onClick={()=>setAdminHandler(member.id)}>
                {member.id}
            </a>
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
        // let createAdmin = createAdminHandler();
        // if (createAdmin === -1) {
        //     alert("Please select an Admin");
        // }

        console.log("admin: " + admin);
        console.log("selectedMembers[0].id: " + selectedMembers[1].id);
        console.log("selectedMembers[1].id: " + selectedMembers[2].id);
        console.log("selectedMembers[2].id: " + selectedMembers[3].id);
        console.log("selectedMembers[3].id: " + selectedMembers[4].id);
        console.log("RSO name " + name);
        console.log("university_id " + university_id);

        let createRSOData = await create_rso(admin, selectedMembers[1].id, selectedMembers[2].id, 
            selectedMembers[3].id, selectedMembers[4].id, name, university_id);

        if (createRSOData.status === 0) {
            console.log("Create RSO was successful");
        } else {
            alert("Error creating rso");
        }
    }

    // const createAdminHandler = async() => {
    //     if (university_id !== null) {
    //         let data = await create_admins(admin, university_id);
    //     } else {
    //         alert(admin + " is not associated with an university");
    //     }
    //     return -1;
    // }
    
    return (
        <div className="inputs">
            <ul>
                <li>
                    <label>
                        Name:
                        <input type='text'  onBlur = { e => NameHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Admin: 
                        <input type='text' onBlur = { e => setAdminHandler(e.target.value)}/>
                    </label>    
                </li>
                <li>
                    <label>
                        Member 1:
                        <input type='text' onBlur = { e => selectedMembersHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Member 2:
                        <input type='text' onBlur = { e => selectedMembersHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Member 3:
                        <input type='text' onBlur = { e => selectedMembersHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Member 4:
                        <input type='text'onBlur = { e => selectedMembersHandler(e.target.value)}/>
                    </label>
                </li>
                
            </ul>
            <button className="button" onClick={()=>createRSOHandler()}> SUBMIT </button>
        </div>
    );
}

export default CreateRSOContent;