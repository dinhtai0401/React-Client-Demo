import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginView from './components/LoginView';
import Auth from './components/Auth';
import axios from 'axios';
import constants from './constants.json';
import PostInfo from './components/PostInfo';
import PostView from './components/PostView';
import PostChange from './components/PostChange';
import PostUser from './components/PostUser';
import PostDetail from './components/PostDetail';

export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      error: null,
      isAuthenticated: false,
      authenticated: false,
      someData: null,
      message: "",
      userInfo: '',
      user: '',
    };
  } 


  onLogin = (result) => {
    if(this.state.authenticated){
      alert("You have already signed in")
    }else{
      this.setState({ isAuthenticated: true })
      this.setState({userInfo: result.toString()})
      console.log(this.state.userInfo);
    }
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  }

  onLogOut= (event) => {
    this.setState({isAuthenticated: false})
    this.setState({ userInfo: ''});
    console.log("logout")
  }

  /* This function illustrates how some protected API could be accessed */

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch("http://localhost:4000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then(responseJson => {
        this.setState({
          authenticated: true,
          user: responseJson.user,
        });
        console.log()
      })
      .catch(error => {
        this.setState({
          authenticated: false,
          error: "Failed to authenticate user"
        });
      });
  }

   

  render() {
    console.log(this.state.post);
    return (
      <div>
      <Router>
        
        <Route path="/login" exact render={
          (routeProps) =>
            <LoginView
              isAuthenticated={this.state.isAuthenticated}
              loginSuccess = { this.onLogin }
              loginFail = { this.onLoginFail }
              redirectPathOnSuccess="/"
              {...routeProps}
            />
        } />
        <Route path="/" exact render={
          (routeProps) => <PostInfo isAuthenticated={this.state.isAuthenticated} authenticated={this.state.authenticated} onLogOut={this.onLogOut} userInfo={this.state.userInfo} user={this.state.user} getProductInfo={ this.getProductInfo } {...routeProps} />
        }/>
        <Route path="/postview" exact render={
          (routeProps) => <PostView user={this.state.user} userInfo={this.state.userInfo} getProductInfo={ this.getProductInfo } {...routeProps} />
        }/>
        <Route path="/product/:id" exact render={
          (routeProps) => <PostChange user={this.state.user} userInfo={this.state.userInfo} getProductInfo={ this.getProductInfo } {...routeProps} />
        }/>
        <Route path="/postuser" exact render={
          (routeProps) => <PostUser user={this.state.user} userInfo={this.state.userInfo} {...routeProps} />
        }/>
        <Route path="/postdetail/:id" exact render={
          (routeProps) => <PostDetail {...routeProps}/>
        }/>
      </Router>
      </div>
    )
  }
}