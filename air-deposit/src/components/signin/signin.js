import React from "react";
import {
  CardBody,
  CardHeader,
  Card,
  Form,
  FormInput,
  FormGroup,
  Button
} from 'shards-react';
import { getEmployee } from '../../firebase/utils';
import './signin.css';
import 'tachyons';
import { BrowserRouter } from "react-router-dom";


export var userLogged;
const  setUser = (user)=>{
  userLogged = user;
}



class  Signin extends React.Component{
    constructor(props){
        super(props);
        this.state= {
       
        }
      }
    
    currentUser;
    
    onSignInButtonClicked =  (event)=>{
        const user = document.getElementById('#username');
      

        getEmployee(user.value).then(
          response =>{
           
            if(response!== false){
              setUser(response);
              this.currentUser = response;
              this.props.onSignIn('dashboard');
            
          }else{
            alert("You are not a manager");
          }
          }
        );
        
       
    }

  render(){
  return (
    <BrowserRouter>
    <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
    
      <Card  style={{maxWidth:'500px', width:'600px'}}>
      <CardHeader className ='f3 calisto'style={{backgroundColor:'DodgerBlue', color:'white'}} >Sign in into your manager account</CardHeader>
      <CardBody >
        <Form>
          <FormGroup>         
              <label className="user__label" htmlFor="#username">Your ID</label>
              <FormInput  id="#username" placeholder="ID" />
              
          </FormGroup>
         
        </Form>
        <Button onClick = {this.onSignInButtonClicked} style={{position: 'relative', left: '40%', top: '90%',fontFamily:'calisto', fontSize:'17px'}} className ='mt3 f3 calisto'>Sign In</Button>
      </CardBody>
    </Card>
    </div>
    </BrowserRouter>
  );
}
};



export default Signin;



