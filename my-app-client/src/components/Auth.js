import axios from 'axios';
import constants from '../constants.json';



let myAuth = {
    authenticate: (username, password, token) => {      
      return new Promise((resolve, reject) => {
        axios.get(constants.baseAddress + '/auth/:id', 
            {
              auth: {
              username: username,
              password: password,
            }
            }).then((e)=>{
            const token = e.data.token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            axios.get(constants.baseAddress + '/auth/signin',
                config
            ).then(res => {
                resolve(res.data);
            }).catch(error => 
                {
                  console.log(error);
                  reject();
                });
            })
    })
    }
}


export default myAuth;