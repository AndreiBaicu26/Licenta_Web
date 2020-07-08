import React from 'react';
import 'tachyons';
import { FormFeedback, Form, FormGroup, Container, Row, Col, Button, Modal, ModalBody, ModalHeader, FormInput} from "shards-react";
import {saveEmployee} from '../../firebase/utils'
import "../../styles/form.css"
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
          if(this.validateCNP(event.target.value)){     

            this.setState({cnp:{cnpValid:true, cnpInvalid:false }})
          }else
            this.setState({cnp:{cnpInvalid: true, cnpValid:false }})
            break;
        default:return;
      }
    
  
  }

  validateCNP( cnpData ) {
    
    var i=0;
    var year=0;
    var result=0; 
    var cnp=[];
    var controlNumbers=[2,7,9,1,4,6,3,5,8,2,7,9];

    if( cnpData.length !== 13 )  return false; 

    for( i=0 ; i<13 ; i++ ) {
        cnp[i] = parseInt( cnpData.charAt(i) , 10 );

        if( isNaN( cnp[i] ) )  return false; 

        if( i < 12 ) {
           result = result + ( cnp[i] * controlNumbers[i] ); 
          }
    }

    
		
		
    result = result % 11;

    if( result === 10 )  result = 1; 

   
    year = (cnp[1]*10)+cnp[2];

    switch( cnp[0] ) {
        case 1  : case 2 : { 
            year += 1900; 
            break;
          } 
        case 3  : case 4 : { 
            year += 1800; 
            break;
          } 
        case 5  : case 6 : { 
            year += 2000; 
            break;
          } 
        default : return false; 
    }
    var luna= parseInt("" + cnp[3] + cnp[4]);
		var zi= parseInt("" + cnp[5] + cnp[6]);
		
		var dataNasterii=new Date();

    
    dataNasterii.setMonth(luna -1 );
    dataNasterii.setDate(zi);
    dataNasterii.setFullYear(year);
    console.log(dataNasterii)
   
		var dataCurenta=new Date();
    console.log(dataCurenta)
    console.log(dataNasterii.getTime() - dataCurenta.getTime())
    
    if((dataCurenta.getTime() - dataNasterii.getTime() ) < 0) return false;
		
    if( year < 1800 || year > 2099 )  return false; 

    return ( cnp[12] === result );
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
          cnp:document.getElementById("cnp").value,
          manager:false
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
          <ModalHeader toggle={this.props.toggle}>Insert employee Info</ModalHeader>
          <ModalBody > 
         <Form>
        
            <Container style={{padding:"0px", backgroundColor:"#ffffff"}} className="formInput">
                 <Row style={{marginLeft:"-1.7rem", marginRight:"-1.7rem"}} className ="pl0"    >
                    <Col className ="pl0">
                    <FormGroup className = "mt1 tl" >
                      <FormInput 
                        className="numeros"
                        placeholder = "First name"
                        id ="fName"
                        valid = {this.state.fName.fNameValid}
                        invalid = {this.state.fName.fNameInvalid}
                        onChange={(e)=>this.validate(e)}>
                      </FormInput>
                      
                        <label className ="ml3 mb0" htmlFor="fName">First name</label>
                        <FormFeedback invalid>Not enough characters</FormFeedback>
                       
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
                      
                        <label className ="ml3 mb0" htmlFor="lName">Last name</label>
                        <FormFeedback invalid>Not enough characters</FormFeedback>
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
                        
                        <label className ="ml3 mb0" htmlFor="email">Email</label>
                        <FormFeedback invalid>Not a valid email</FormFeedback>
                  </FormGroup>

                  <FormGroup  row={true}>
                      <FormInput 
                        className="numeros" 
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