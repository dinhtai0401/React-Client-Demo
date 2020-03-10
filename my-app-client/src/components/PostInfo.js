import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import constants from '../constants.json';
import Auth from './Auth';


export default class PostInfo extends Component {


  constructor(props)
  {
    super(props);
    this.state = {
      error: null,
      //authenticated: false,
      post: [],
      search: '',
      selectedValue: 'category',
      options: [
        {
          name: 'Category',
          value: 'category',
        },
        {
          name: 'Location',
          value: 'location',
        },
        {
          name: 'Date Of Posting',
          value: 'dateOfPosting',
        }
      ]
    };
  }  

 
    handleChange = (e) => {
      this.setState({search: e.target.value.substr(0,20)});
    }

    selectedValueHandler = (e) => {
    this.setState({selectedValue: e.target.value});
    }




    handleOnDelete = (id) =>{
      console.log(id);
      if(this.props.authenticated || this.props.isAuthenticated){
        if(this.props.user !== ''){
          axios.delete("http://localhost:4000/post/" + id
          ).then(function (response) {
              console.log(response);
          })
              .catch(function (error) {
                  console.log(error);
              });
          let deleted_array_of_post = this.state.post.filter(i => i.id != id);
          console.log(deleted_array_of_post);
          this.setState({post : deleted_array_of_post});
        }
        }      
    }


    handleOnChange = (id) =>{
      console.log(typeof(id));

    }

    


    componentDidMount() {
      axios.get(constants.baseAddress + "/post")
      .then(res => {
        console.log(res.data);
        this.setState({ post: res.data });
      })
    };


  
    handleSignInClick = () => {
      if(this.props.isAuthenticated){
        alert("You have alreaday logged in")
      }else{
        window.open("http://localhost:4000/auth/google", "_self");
      }
    };
  
    handleLogoutClick = () => {
      window.open("http://localhost:4000/auth/logout", "_self");
      this.setState({ authenticated: false });
    };



  render() {
    var { authenticated } = this.props;
    var { isAuthenticated } = this.props;
    console.log(this.state.post)
    console.log(this.props.authenticated);
        let FilterPost;
        if(this.state.selectedValue === 'category'){
          FilterPost = this.state.post.filter(i => i.category.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)  
        }else if (this.state.selectedValue === 'location') {
        FilterPost = this.state.post.filter(i => i.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
        } else if (this.state.selectedValue === 'dateOfPosting') {
        FilterPost = this.state.post.filter(i => i.dataOfPosting.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
        }
    return (
      <div>
        {authenticated ? (
          <button onClick={this.handleLogoutClick}>Logout</button>
        ) : (
          <button onClick={this.handleSignInClick}>Gmail+</button>
        )}
        <div>
          {!authenticated ? (
            <h3>Welcome!</h3>
          ) : (
            <div>
              <h3>You have login succcessfully!</h3>
            </div>
          )}
        </div>
        <button><Link to={'/login'}>Login</Link></button>
        <button><Link to={'/postview'}>Post View</Link></button>
        <button onClick={this.props.onLogOut}>Logout</button>
        <div>
          {!authenticated && !isAuthenticated ? (
            <button><a>Login first</a></button>
          ) : (
            <button><Link to={'/postuser'}>Post User</Link></button>
          )}
        </div>
        
        <div>
        <select
        id="searchSelect"
        name="searchSelect"
        onChange={this.selectedValueHandler.bind(this)} >
        {this.state.options.map(item => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
        </select>
        <input type='text'
        value={this.state.search}
        onChange={this.handleChange.bind(this)} />
        </div>
        <div>
        {FilterPost.map(i => 
            <div key={i.id} style={{paddingTop: 20}}>
               <div>{i.image.map(url => <img src={url} style={{width: "8%"}}></img>)}</div>
               <div>{i.title}</div>
               <div>{i.description}</div>
               <div>{i.category}</div>
               <div>{i.location}</div>
               <div>{i.price}</div>
               <div>{i.dataOfPosting}</div>
               <div>{i.delivery}</div>
               <div>{i.SellerOfName}</div>
               <button><Link to={`/postdetail/${i.id}`}>Detail</Link></button>
            </div>
        )}
        </div>
      </div>
    )
  }
}