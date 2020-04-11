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
import './signin.css';
import 'tachyons';

class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state= {

        }
    }

    onSignInButtonClicked = (event)=>{
        const user = document.getElementById('#username');
        const pass = document.getElementById('#password');

        const userText = user.value;
        const passText = pass.value;
        if(userText === 'admin' && passText === 'admin'){
            this.props.onSignIn('dashboard');
        }
    }

    

  render(){
  return (
    <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
      <Card  style={{maxWidth:'500px', width:'600px'}}>
      <CardHeader className ='f3 calisto'style={{backgroundColor:'DodgerBlue', color:'white'}} /*style={{backgroundColor: 'aqua'}} */>Sign in into your manager account</CardHeader>
      <CardBody >
        <Form>
          <FormGroup>         
              <label className="user__label" htmlFor="#username">Username</label>
              <FormInput  id="#username" placeholder="Username" />
              
          </FormGroup>
          <FormGroup>   
            <label className="pass__label"htmlFor="#password">Password</label>
            <FormInput type="password" id="#password" placeholder="Password" />
          </FormGroup>
        </Form>
        <Button onClick = {this.onSignInButtonClicked} style={{position: 'relative', left: '40%', top: '90%',fontFamily:'calisto', fontSize:'17px'}} className ='mt3 f3 calisto'>Sign In</Button>
      </CardBody>
    </Card>
    </div>
  );
}
};

export default Signin;
