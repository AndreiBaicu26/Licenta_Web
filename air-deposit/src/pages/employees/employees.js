import React from "react";
import 'tachyons';
import { Form, FormGroup, Container, Row, Col, Button, Modal, ModalBody, ModalHeader, FormInput} from "shards-react";


class EmployeesDashboard extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      modalOpen:false
    }
  }
  
  toggleModal(){
    this.setState({modalOpen:!this.state.modalOpen})
  }

  render(){
    return (  
      <div>
      <Button theme="success" onClick ={()=>this.toggleModal()}>Add Employee</Button>
   
      <Modal size ="lg"   open={this.state.modalOpen} toggle={()=>this.toggleModal()}>
          <ModalHeader>Insert employee Info</ModalHeader>
          <ModalBody > 
         <Form>
            <Container style={{padding:"0px"}} className="formInput">
                 <Row style={{marginLeft:"-1.7rem", marginRight:"-1.7rem"}} className ="pl0"    >
                    <Col className ="pl0">
                    <FormGroup className = "mt1" >
                      <FormInput 
                        placeholder = "first name"
                        id ="#fname">
                      </FormInput>
                        <label className ="ml3 mb0" htmlFor="#fname">Email</label>
                  </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup className = "mt1" >
                      <FormInput 
                        className="" 
                        type="email" 
                        placeholder = "email"
                        id ="#email">
                      </FormInput>
                        <label className ="ml3 mb0" htmlFor="#email">Email</label>
                  </FormGroup>
                    </Col>
                 </Row>
                 </Container>
                 <FormGroup className = "mt1" row={true}>
                      <FormInput 
                        className="" 
                        type="email" 
                        placeholder = "email"
                        id ="#email">
                      </FormInput>
                        <label className ="ml3 mb0" htmlFor="#email">Email</label>
                  </FormGroup>

                  <FormGroup  row={true}>
                      <FormInput 
                        className="" 
                        type="number" 
                        placeholder = "Phone number"
                        id ="#phone">
                      </FormInput>
                        <label className ="ml3 mb0" htmlFor="#phone">Phone Number</label>
                  </FormGroup>


                 <FormGroup  row={true}>
                      <FormInput 
                        className="" 
                        type="number" 
                        placeholder = "CNP"
                        id ="#cnp">
                      </FormInput>
                        <label className ="ml3 mb0"htmlFor="#cnp">CNP</label>
                  </FormGroup>

                <FormInput 
                    style={{
                        backgroundColor:"DodgerBlue", 
                        color:"#fff"
                    }} 
                    type = "submit" >
                </FormInput>
          
            </Form>
          </ModalBody>        
        </Modal>
       
      </div>
    );
  }
};


export default EmployeesDashboard;
