import React, { useContext, useState, useEffect } from 'react';
import './CreateRSOContent.css';
import { createUniversities } from '../../utils/apiCalls';

const CreateUniversityContent = (props) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pictures, setPictures] = useState(''); 
    const [num_of_students, setNum_of_students] = useState('');
    let super_user_id = localStorage.getItem('super_admin_id');
    const [address, setAddress] = useState('');
    // const [files, setFiles] = useState([]); 

    const createUniversityHandler = async() => {
        const formData = new FormData();
        formData.append('super_user_id', super_user_id);
        formData.append('name', name);
        formData.append('pictures', pictures, pictures.name);
        formData.append('location_address', address);
        formData.append('num_of_students', num_of_students);
        let data = await createUniversities(formData);
        if (data.status === 0) {
            alert(name + "profile created");
        }
    }

    const setAddressHandler = address => {
        setAddress(address);
    }

    const nameHandler = name=>{
        setName(name);
    }

    const picturesHandler = pictures=>{
        setPictures(pictures.target.files[0]);
    }

    const num_of_studentsHandler = num_of_students=>{
        setNum_of_students(num_of_students);
    }

    return (
         <div className="inputs">
            <ul>
                <li>
                    <label>
                        Name:
                        <input type='text'  onBlur = { e => nameHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Pictures: 
                        <input type="file" name="pictures" onBlur={ e => picturesHandler(e)} />
                    </label>    
                </li>
                <li>
                    <label>
                        Address: 
                        <input type='text' onBlur = { e => setAddressHandler(e.target.value)}/>
                    </label>
                </li>
                <li>
                    <label>
                        Number of Students:
                        <input type='text' onBlur = { e => num_of_studentsHandler(e.target.value)}/>
                    </label>
                </li>
            </ul>
            <button className="button" onClick={()=>createUniversityHandler()}> SUBMIT </button>
        </div>
    );
}

export default CreateUniversityContent;