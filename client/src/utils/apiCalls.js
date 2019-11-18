export const login = async (username,inputPassword) => { 
    try{
        let response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                inputPassword: inputPassword,
            }),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        return response.text().then(function(text) {
            console.log("Login response",text);
            return text ? JSON.parse(text) : {}
        })   
    }
    catch(e){
        console.log(e);
    } 
}

export const signUp = async (username,password,name) => { 
    try{
        let response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({username: username, password: password, name: name}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("SignUp response",text);
            return text ? JSON.parse(text) : {}
        })
        //return data;        
    }
    catch(e){
        console.log(e);
    } 
}

export const assign_super_admins = async (user_id) => { 
    try{
        let response = await fetch('/api/assign_super_admins', {
            method: 'POST',
            body: JSON.stringify({user_id: user_id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("Assign super admins response", text);
            return text ? JSON.parse(text) : {}
        })
        //return data;        
    }
    catch(e){
        console.log(e);
    } 
}

export const create_admins = async (user_id, university_id) => {
    try{
        let response = await fetch('/api/create_admins', {
            method: 'POST',
            body: JSON.stringify({user_id: user_id, university_id: university_id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("Create super admins response", text);
            return text ? JSON.parse(text) : {}
        })
        //return data;        
    }
    catch(e){
        console.log(e);
    } 
}

export const create_rso = async (admin_id,user_id1,user_id2,user_id3,user_id4,name,admin_university_id) => { 
    try{
        let response = await fetch('/api/create_rso', {
            method: 'POST',
            body: JSON.stringify({admin_id: admin_id, user_id1: user_id1, user_id2: user_id2, ser_id2: user_id2, 
                user_id3: user_id3, user_id4: user_id4, name: name,  admin_university_id: admin_university_id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("Create rso response",text);
            return text ? JSON.parse(text) : {}
        })
        //return data;        
    }
    catch(e){
        console.log(e);
    } 
}

export const getAdminById = async (user_id) => { 
    try{
        let response = await fetch('/api/getAdminById', {
            method: 'POST',
            body: JSON.stringify({user_id: user_id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("getSuperAdminById response",text);
            return text ? JSON.parse(text) : {}
        })      
    }
    catch(e){
        console.log(e);
    } 
}

export const getSuperAdminById = async (user_id) => { 
    try{
        let response = await fetch('/api/getSuperAdminById', {
            method: 'POST',
            body: JSON.stringify({user_id: user_id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("getSuperAdminById response",text);
            return text ? JSON.parse(text) : {}
        })
        //return data;        
    }
    catch(e){
        console.log(e);
    } 
}

export const createUniversities = async (formData) => { 
    try{
        let response = await fetch('/api/create_universities', {
            method: 'POST',
            body: formData
        })
        return response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
        })   
    }
    catch(e){
        console.log(e);
    } 
}
    
export const createEvents = async (formData) => { 
    try{
        const response = await fetch('/api/create_event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const body = await response.text();
        return body;
    }
    catch(e){
        console.log(e);
    } 
}

export const getUserById = async (id) => { 
    try{
        let response = await fetch(`/api/getUserById/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
        })   
    }
    catch(e){
        console.log(e);
    } 
}

export const getEventByID = async (event_id) => { 
    try{
        const response = await fetch('/api/events?id=' + event_id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    } catch(e){
        console.log(e);
    } 
}

export const getUniversityIdByUserId = async (id) => { 
    try{
        let response = await fetch(`/api/getUniversityIdByUserId/?user_id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
        })   
    }
    catch(e){
        console.log(e);
    } 
}

// Catch empty JSON object
export const getAllEventsByType = async (username, event_type) => { 
    try{
        const postBody = {
            "username": username,
            "event_type": event_type
          }

        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody)
        })
        const body = await response.json();
        console.log("in apiCalls: " + body.results);
        return body.results[0];
    }
    catch(e){
            console.log(e);
        } 
    }
    
export const getUniversityIdByName = async (name) => { 
    try{
        let response = await fetch(`/api/getUniversityIdByName/?name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            return text ? JSON.parse(text) : {}
        })   
    }
    catch(e){
        console.log(e);
    } 
}

export const studentOf = async (user_id, university_id) => {
    try{
        let response = await fetch('/api/studentOf', {
            method: 'POST',
            body: JSON.stringify({user_id: user_id, university_id: university_id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        return response.text().then(function(text) {
            console.log("StudentOf response", text);
            return text ? JSON.parse(text) : {}
        })
        //return data;        
    }
    catch(e){
        console.log(e);
    } 
}
