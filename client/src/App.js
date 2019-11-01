import React, { Component } from 'react';
import logo from './imgs/Purple-Abstract.jpg';
import './App.css';
import HomeButton from './components/buttons/homeButton';
// import Customers from './components/customers';
import { login, getSuperAdminById } from './utils/apiCalls';

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

  loginHandler = async(event) => {
    console.log(JSON.stringify(this.state))
    event.preventDefault();
    const {username,inputPassword} = this.state;
    let data = await login(username,inputPassword);
    console.log(data);
    if (data.status === 0) {
      console.log("Login was successful");
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('user_id', this.state.username);
      let getSuperAdminData = await getSuperAdminById(username);
      console.log(getSuperAdminData)
      if (getSuperAdminData.length !== 0) {
        console.log("getSuperAdminId was successful");
        localStorage.setItem('super_admin_id', this.state.username);
      } 
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div className="App">
        <header id="sign_in_header" className="App-header">
          <div className="container-left">
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
