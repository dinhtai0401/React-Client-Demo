import React, { Component } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import constants from '../constants.json';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          post:[],
        };
      }
      

      componentDidMount() {
        if(this.props.user !== ''){
            axios.get(constants.baseAddress + "/post/" + parseInt(this.props.match.params.id))
            .then(res => {
            console.log(res.data);
            this.setState({ post: res.data});
        })
        }
      };

    render(){
        console.log(parseInt(this.props.match.params.id));
        if(this.state.post){
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
                     <button><Link to={'/'}>Home</Link></button>
                   </div>
                </div>
            )}
            </div>
            
        );
        }
          
        
       }
      
}