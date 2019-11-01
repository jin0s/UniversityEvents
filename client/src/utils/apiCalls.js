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