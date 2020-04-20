import React from 'react';
import 'tachyons';
import { FormFeedback, Form, FormGroup, Container, Row, Col, Button, Modal, ModalBody, ModalHeader, FormInput} from "shards-react";
import {saveEmployee} from '../../firebase/utils'

class EmployeeForm extends React.Component{


    constructor(props){
        super(props);
      
        this.state={
            open:false,
            email:{
                emailValid: false,
                emailInvalid: false
              },
              fName:{
                fNameValid:false,
                fNameInvalid:false
              },
              lName:{
                lNameValid:false,
                lNameInvalid:false
              },
              cnp:{
                cnpValid:false,
                cnpInvalid:false
              }
        
        }
    }

    

    mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
    validate = (event) =>{

      switch(event.target.id){

        case "email":
          if(event.target.value.match(this.mailformat)){ 
              
            this.setState({email:{emailValid:true, emailInvalid:false }})
          
          }else
            this.setState({email:{emailInvalid: true, emailValid:false }})
            break;

        case "fName":
        
          if(event.target.value.length > 3){  
            this.setState({fName:{fNameValid:true, fNameInvalid:false }})
          }else
          
            this.setState({fName:{fNameInvalid: true, fNameValid:false }})
            break;

        case "lName":
          event.target.setCustomValidity("Insert more than 3 characters");
          if(event.target.value.length > 3){     
            this.setState({lName:{lNameValid:true, lNameInvalid:false }})
          }else
            this.setState({lName:{lNameInvalid: true, lNameValid:false }})
            break;

        case "cnp":
          if(event.target.value.length === 13){     
            this.setState({cnp:{cnpValid:true, cnpInvalid:false }})
          }else
            this.setState({cnp:{cnpInvalid: true, cnpValid:false }})
            break;
        default:return;
      }
    
  }
  
  componentWillMount(){
    this.setState({open:this.props.open})
  }

  
  saveEmployee=async ()=>{

    const {email, fName, lName, cnp} = this.state;
    if(cnp.cnpValid && fName.fNameValid && lName.lNameValid && email.emailValid){
        const employee={
          firstName:document.getElementById("fName").value,
          lastName:document.getElementById("lName").value,
          phone:document.getElementById("phone").value,
          email:document.getElementById("email").value,
          cnp:document.getElementById("cnp").value
        }
      try{
        await saveEmployee(employee);
       

        alert("Employee added succsessfully")
        this.props.toggle();
        
      }catch(err)
      {
        console.log(err);
       alert("Employee already in database")
        
      }
     
  }
  }

  
  changeState(){
    this.setState({email:{
      emailValid: false,
      emailInvalid: false
    },
    fName:{
      fNameValid:false,
      fNameInvalid:false
    },
    lName:{
      lNameValid:false,
      lNameInvalid:false
    },
    cnp:{
      cnpValid:false,
      cnpInvalid:false
    }})
  }
  


  render(){
    if(this.props.open ===true && this.state.open===false){
      this.setState({open:true})
      this.changeState();
    }else
      if(this.props.open ===false && this.state.open===true){
        this.setState({open:false})
      } 
  
    return (   
      <div>
      
      <Modal  size ="lg" open={this.props.open} toggle = {this.props.toggle}>
          <ModalHeader>Insert employee Info</ModalHeader>
          <ModalBody > 
         <Form>
        
            <Container style={{padding:"0px"}} className="formInput">
                 <Row style={{marginLeft:"-1.7rem", marginRight:"-1.7rem"}} className ="pl0"    >
                    <Col className ="pl0">
                    <FormGroup className = "mt1 tl" >
                      <FormInput 
                        placeholder = "First name"
                        id ="fName"
                        valid = {this.state.fName.fNameValid}
                        invalid = {this.state.fName.fNameInvalid}
                        onChange={(e)=>this.validate(e)}>
                      </FormInput>
                      <FormFeedback invalid>Not enough characters</FormFeedback>
                        <label className ="ml3 mb0" htmlFor="fname">First name</label>
                       
                  </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className = "mt1 tl" >
                      <FormInput 
                        type="text" 
                        placeholder = "Last name"
                        id ="lName"
                        valid = {this.state.lName.lNameValid}
                        invalid = {this.state.lName.lNameInvalid}
                        onChange={(e)=>this.validate(e)}>
                      </FormInput>
                      <FormFeedback invalid>Not enough characters</FormFeedback>
                        <label className ="ml3 mb0" htmlFor="lName">Last name</label>
                  </FormGroup>
                    </Col>
                 </Row>
                 </Container>
                 <FormGroup className = "mt1" row={true}>
                      <FormInput 
                        className="" 
                        type="email" 
                        placeholder = "Email"
                        id ="email"
                        valid = {this.state.email.emailValid}
                        invalid = {this.state.email.emailInvalid}
                        onChange={(e)=>this.validate(e)}
                       
                       >
                      </FormInput>
                        <FormFeedback invalid>Not a valid email</FormFeedback>
                        <label className ="ml3 mb0" htmlFor="email">Email</label>
                  </FormGroup>

                  <FormGroup  row={true}>
                      <FormInput 
                        className="" 
                        type="number" 
                        placeholder = "Phone number"
                        id ="phone">
                      </FormInput>

                        <label className ="ml3 mb0" htmlFor="phone">Phone Number</label>
                  </FormGroup>


                 <FormGroup  row={true}>
                      <FormInput 
                        className="" 
                        type="number" 
                        placeholder = "CNP"
                        id ="cnp"
                        valid = {this.state.cnp.cnpValid}
                        invalid = {this.state.cnp.cnpInvalid}
                        onChange={(e)=>this.validate(e)}>
                      </FormInput>
                        <label className ="ml3 mb0"htmlFor="cnp">CNP</label>
                        <FormFeedback invalid>Not a valid CNP</FormFeedback>
                  </FormGroup>
                  
                <Button style={{
                        backgroundColor:"DodgerBlue", 
                        color:"#fff"
                    }} onClick = {()=>this.saveEmployee()}>Submit</Button>
         
            </Form>
          </ModalBody>        
        </Modal>
       
        </div>
    );
  }
}

export default EmployeeForm;