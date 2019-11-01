import React, { useContext, useState } from 'react';;

const CreateUniversityContent = (props) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [pictures, setPictures] = useState('');
    const [location_address, setLocation_address] = useState('');
    const [num_of_students, setNum_of_students] = useState('');
    const super_user_id = localStorage.getItem('super_user_id');

    const createUniversityHandler = async() => {
        console.log("creating university")
    }

    const nameHandler = name=>{
        setName(name);
    }

    const picturesHandler = pictures=>{
        setPictures(pictures);
    }

    const location_addressHandler = location_address=>{
        setLocation_address(location_address);
    }

    const num_of_studentsHandler = num_of_students=>{
        setNum_of_students(num_of_students);
    }
    
    return (
        <div className="createUniversityContainer">
            <form onSubmit={()=>createUniversityHandler()}>
                <label>
                    Name:
                    <input type="text" value="Name" onChange={ e => nameHandler(e.target.value)} />
                </label>
                <label>
                    Pictures:
                    <input type="text" value="Pictures" onChange={ e => picturesHandler(e.target.value)} />
                </label>
                <label>
                    Address:
                    <input type="text" value="Address" onChange={ e => location_addressHandler(e.target.value)} />
                </label>
                <label>
                    Number of Students:
                    <input type="text" value="Number of Students" onChange={ e => num_of_studentsHandler(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default CreateUniversityContent;


// const values = [req.body.id, req.body.super_user_id, req.body.name, 
//     req.body.pictures, req.body.location_address, req.body.num_of_students];