import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class PostView extends Component {

    constructor(props) {
        super(props);

        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            imgCollection: '',
            selectedValue: 'delivery',
            options: [
              {
                name: 'delivery',
                value: 'delivery',
              },
              {
                name: 'pick up',
                value: 'pick up',
              }
            ]
        }
    }

    selectedValueHandler = (e) => {
        this.setState({selectedValue: e.target.value});
    }

    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }

    onChange = e => {
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState(state);
    };

    onSubmit(e) {
        e.preventDefault();
        if (this.props.userInfo !== '') {
            var formData = new FormData();
            for (const key of Object.keys(this.state.imgCollection)) {
                formData.append('imgCollection', this.state.imgCollection[key])
                
            } 
            formData.append('idUser', this.props.userInfo);
            formData.append('title', e.target['title'].value);
            formData.append('description', e.target['description'].value);
            formData.append('category', e.target['category'].value);
            formData.append('location', e.target['location'].value);
            formData.append('price', e.target['price'].value);
            formData.append('delivery', this.state.selectedValue);
            formData.append('SellerOfName', e.target['SellerOfName'].value);
            axios.post("http://localhost:4000/post", formData, {
          
            }).then(res => {
                console.log(res.data)
            })
        }else if (this.props.user !== '') {
            var formData = new FormData();
            for (const key of Object.keys(this.state.imgCollection)) {
                formData.append('imgCollection', this.state.imgCollection[key])
                
            } 
            formData.append('idUser', this.props.user);
            formData.append('title', e.target['title'].value);
            formData.append('description', e.target['description'].value);
            formData.append('category', e.target['category'].value);
            formData.append('location', e.target['location'].value);
            formData.append('price', e.target['price'].value);
            formData.append('delivery', this.state.selectedValue);
            formData.append('SellerOfName', e.target['SellerOfName'].value);
            axios.post("http://localhost:4000/post", formData, {
          
            }).then(res => {
                console.log(res.data)
            })
        }else{
            alert("must login")
        }
      
    }

    render() {
        console.log(this.props.user);
        return (
            <div className="container">
                <div className="row">
                <form method="get" action="" onSubmit={this.onSubmit.bind(this)}>
                        <div > 
                        <h3>title</h3>
                        <input placeholder="Name"  type="text" name="title"></input>
                        </div>
                        <h3>description</h3>
                        <div > 
                        <input placeholder="Name"  type="text" name="description"></input>
                        </div>
                        <h3>category</h3>
                        <div > 
                        <input placeholder="Name"  type="text" name="category"></input>
                        </div>
                        <h3>location</h3>
                        <div > 
                        <input placeholder="Name"  type="text" name="location"></input>
                        </div>
                        <div className="container">
                                <h3>image</h3>
                                <div className="row">
                                    
                                        <div className="form-group">
                                            <input type="file" name="imgCollection" onChange={this.onFileChange.bind(this)} multiple />
                                        </div>
                                        <div className="form-group">
                                        </div>
                                </div>
                        </div>
                        <div>
                        <h3>price</h3>
                        <input placeholder="Name"  type="text" name="price"></input>
                        </div>
                        <div>
                        <h3>delivery</h3>
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
                        </div>
                        <div>
                        <h3>seller of name</h3>
                        <input placeholder="Name"  type="text" name="SellerOfName"></input>
                        </div>
                        <div>
                            <h3>-------</h3>
                            <div><button type="submit" >Submit</button></div></div>
                </form>
                <div><button><Link to='/'>Home</Link></button></div>
                </div>
            </div>
        )
    }
}
