import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import constants from '../constants.json';

export default class PostView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: [],
        }
    }


    handleOnDelete = (id) =>{
        console.log(id);
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

    componentDidMount() {
            if(this.props.user !== ''){
                axios.get(constants.baseAddress + "/post/" + this.props.user)
                .then(res => {
                console.log(res.data);
                this.setState({ post: res.data });
            })
            }else if(this.props.userInfo !== ''){
                axios.get(constants.baseAddress + "/post/" + this.props.userInfo)
                .then(res => {
                console.log(res.data);
                this.setState({ post: res.data });
            })
            }
      };
  

    render() {
        console.log(this.state.post)
        return (
            <div>
            {this.state.post.map(i => 
                <div key={i.id}>
                   <div>{i.image.map(url => <img src={url} style={{width: "8%"}}></img>)}</div>
                   <div>{i.title}</div>
                   <div>{i.description}</div>
                   <div>{i.category}</div>
                   <div>{i.location}</div>
                   <div>{i.price}</div>
                   <div>{i.dataOfPosting}</div>
                   <div>{i.delivery}</div>
                   <div>{i.SellerOfName}</div>
                   <div>
                     <button><Link to={`/product/${i.id}`}>Change</Link></button>
                     <button onClick={this.handleOnDelete.bind(this, i.id)}>Delete</button>
                   </div>
                </div>
            )}
            <div>
            <button><Link to={`/`}>Home</Link></button>
            </div>
            </div>
        )
    }
}