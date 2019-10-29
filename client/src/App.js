import React, { Component } from 'react';
import logo from './imgs/Purple-Abstract.jpg';
import './App.css';
import HomeButton from './components/buttons/homeButton';
// import Customers from './components/customers';

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

  onClick = (event) => {
    console.log(JSON.stringify(this.state))
    event.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(({status}) => {
      if (status === 0) {
        console.log("Login was successful");
        this.props.history.push("/home");     
      } else {
        alert('Invalid Username or Password');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
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
                  type='password' 
                  value={this.state.password} 
                  onChange={this.handleInputChange} 
                  required
                />
              </div>
              <button className='login' onClick={this.onClick}> LOGIN </button>
              <HomeButton className='signup' path='/signup' {...this.props}>SIGN UP</HomeButton>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
