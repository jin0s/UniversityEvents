import React, { Component } from 'react';
import logo from './imgs/Purple-Abstract.jpg';
import './App.css';
import HomeButton from './components/buttons/homeButton';
// import Customers from './components/customers';

class App extends Component {
  render() {
    const loginHandler = async() =>{
      // let data = await login(username,password);
      // console.log("Result" , data);
      // if(data.error === ""){
      //     console.log("Login was successful");
      //     localStorage.setItem('token', data.token);
      //     localStorage.setItem('username', this.state.username);
      //     localStorage.setItem('usernameFriend', '');
      //     this.props.history.push("/home");
      // }
      // else{
      //     alert(data.error);
      // } 
      this.props.history.push("/home");     
    }
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">React Express Starter</h1>
      //   </header>
      // </div>
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
                {/* <input className='username' placeholder="Username" value={username} onChange= { e => this.setState({...this.state, username: e.target.value})}/> */}
                <input className='usename' placeholder="Username"/>
              </div>
              <div id="password_login">
                Password: 
                {/* <input className='password' placeholder="Password" type='password' value={password} onChange= { e => this.setState({...this.state, password: e.target.value})}/> */}
                <input className='password' placeholder="Password" type='password'/>
              </div>
              <button className='login' onClick={()=>loginHandler()}> LOGIN </button>
              <HomeButton className='signup' path='/signup' {...this.props}>SIGN UP</HomeButton>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
