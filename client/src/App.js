import React, { Component } from 'react';
// import logo from './imgs/Purple-Abstract.jpg';
import logo from './imgs/ucf.jpg';
import './App.css';
import HomeButton from './components/buttons/homeButton';
// import Customers from './components/customers';
import { login, getSuperAdminById, getUniversityIdByUserId, getAdminById } from './utils/apiCalls';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      inputPassword:'',
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  // TODO: Refactor using props instead of localstorage for the boogieman
  // Refactor by assigning role instead of using multiple variables
  loginHandler = async(event) => {
    event.preventDefault();
    const {username,inputPassword} = this.state;
    let data = await login(username,inputPassword);
    if (data.status === 0) {
      console.log("Login was successful");
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('user_id', this.state.username);
      let getSuperAdminData = await getSuperAdminById(username);
      let getAdminData = await getAdminById(username);
      if (getSuperAdminData.length !== 0) {
        console.log("getSuperAdminId was successful");
        localStorage.setItem('super_admin_id', this.state.username);
      } else if (getAdminData.length !== 0) {
        console.log("We have an adminstrator")
        localStorage.setItem('admin', this.state.username);
      }
      this.props.history.push("/home");
    }
    let universityData = await getUniversityIdByUserId(username);
    if (universityData.length !== 0) {
      localStorage.setItem('university_id', universityData[0].university_id);
    }
  }

  render() {
    return (
      <div className="App">
        <header id="sign_in_header" className="App-header">
          <div className="container-left" style = {{wiheightdth:"50%"}}>
            <img src={logo} width='80%' height='auto'/>
          </div>
          <div className="container-right">
            <div id="logo_header">
                <p className='uniEvents'>University Events</p>
            </div>
            <div id="loginDiv">
              <div id="username_login">
                Username:
                <input 
                  className='username'
                  name="username" 
                  placeholder="Username" 
                  value={this.state.username} 
                  onChange={this.handleInputChange} 
                  required
                />
              </div>
              <div id="password_login">
                Password: 
                <input 
                  className='password'
                  name="inputPassword" 
                  placeholder="Password" 
                  type='password' 
                  value={this.state.password} 
                  onChange={this.handleInputChange} 
                  required
                />
              </div>
              <button className='login' onClick={this.loginHandler}> LOGIN </button>
              <HomeButton className='signup' path='/signup' {...this.props}>SIGN UP</HomeButton>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
