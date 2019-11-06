import React, { useContext, useState } from 'react';
import './CreateUniversityContent.css';
import { createUniversities } from '../../utils/apiCalls'

const CreateUniversityContent = (props) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pictures, setPictures] = useState(''); 
    const [location_address, setLocation_address] = useState('');
    const [num_of_students, setNum_of_students] = useState('');
    let super_user_id = localStorage.getItem('super_admin_id');
    // const [files, setFiles] = useState([]); 

    const createUniversityHandler = async() => {
        console.log(pictures)
        const formData = new FormData();
        formData.append('super_user_id', super_user_id);
        formData.append('name', name);
        formData.append('pictures', pictures, pictures.name);
        formData.append('location_address', location_address);
        formData.append('num_of_students', num_of_students);
        let data = await createUniversities(formData);
        console.log(data);
    }

    const nameHandler = name=>{
        setName(name);
    }

    const picturesHandler = pictures=>{
        setPictures(pictures.target.files[0]);
    }

    const location_addressHandler = location_address=>{
        setLocation_address(location_address);
    }

    const num_of_studentsHandler = num_of_students=>{
        setNum_of_students(num_of_students);
    }
    
    return (
        <div className="createUniversityContainer">
            <div id="signUp">
                <div className="input">
                    Name: 
                    <input onBlur={ e => nameHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Pictures:
                    <input type="file" name="pictures" onBlur={ e => picturesHandler(e)} />
                </div>
                <div className="input">
                    Address: 
                    <input onBlur={ e => location_addressHandler(e.target.value)}/>
                </div>
                <div className="input">
                    Number of Students:
                    <input onBlur= { e => num_of_studentsHandler(e.target.value)} />
                </div>
                <button className="submit" onClick={()=>createUniversityHandler()}> SUBMIT </button>
            </div>
        </div>
    );
}

export default CreateUniversityContent;


// const values = [req.body.id, req.body.super_user_id, req.body.name, 
//     req.body.pictures, req.body.location_address, req.body.num_of_students];