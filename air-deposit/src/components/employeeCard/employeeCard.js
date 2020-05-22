import React from "react";
import {Card, CardBody, Button, Collapse,  Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";
import "tachyons"
import "../../styles/toggleStyle.css"
import { removeEmployee, promoteEmployee,demoteEmployee  } from "../../firebase/utils";
import { userLogged } from "../signin/signin";

const collapseStyle = {
    zIndex:"1",
    maxWidth:"80%",
    marginTop:"-20px", 
    marginLeft:"11%",
    marginRight:"11%"
}
class EmployeeCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            modalIsOpen:false,
            modalMakeManager:false,
            lastAdminModal:false
        }
    }


    toggleCollapse = () =>{
        this.setState({collapse:!this.state.collapse});
    }

    toggleLastAdminModal = ()=>{
        this.setState({lastAdminModal:!this.state.lastAdminModal});
    }

    toggleMakeManagerModal = ()=>{
        this.setState({modalMakeManager:!this.state.modalMakeManager});
    }

    toggleModal = ()=>{
        this.setState({modalIsOpen:!this.state.modalIsOpen});
    }

    removeEmployee = async (e)=>{
        this.toggleModal();
        if(await removeEmployee(e)===true){
            
            alert("Employee removed")
            
        }
    }

    promoteEmployee = async (employee)=>{
        this.toggleMakeManagerModal();
        let result = await promoteEmployee(employee);
        if(result === true){
            alert(`Employee ${employee.lastName +" "+ employee.firstName} promoted!`)
           
        }else{
            alert("Error while promoting")
        }

    }

    demoteEmployee = async (employee)=>{
        this.toggleMakeManagerModal();
        let result = await demoteEmployee(employee);
        if(result === true){
            alert(`Employee ${employee.lastName +" "+ employee.firstName} demoted!`)
            if(employee.cnp === userLogged.cnp){
                this.props.onSignIn("signin");
            }
        }else{
          
            this.toggleLastAdminModal();
        }
        
    }

    render(){
      
        const employee = this.props.data;
    return(
        <div>
            <Card style ={{zIndex:"2",maxWidth:"80%", marginTop:"20px", marginLeft:"10%"}} small>
                                
                <CardBody>
                <div className="flex justify-between items-center">
                    <h2>{employee.firstName + " " + employee.lastName}</h2>
                    <div>
                        <Button className="mr-3" onClick = {()=>this.toggleCollapse()}>More Info</Button>
                        <Button theme="danger" onClick = {()=>this.toggleModal()}>Remove</Button>
                    </div>
                 </div>
                </CardBody>
                
            </Card>
            <Collapse style ={collapseStyle} open={this.state.collapse}>
                <div className="flex justify-between items-center p-3 mt-3 ba b--light-gray br3 bg-near-white">
                    <ul style={{textAlign:"left", columnCount:"2"}}>
                        <li><span>First Name :</span>  {employee.firstName}</li>
                        <li><span>Last Name :</span> {employee.lastName}</li>
                        <li><span>CNP :</span> {employee.cnp}</li>
                        <li><span>Email : </span>{employee.email}</li>
                        <li><span>Phone :</span> {employee.phone}</li>
                        <li><span>User ID : </span>{employee.id}</li>
                        <li><span>Manager : </span>{employee.manager ? "Yes" : "No"}</li>
                    </ul>

                    <Button theme="info"
                    onClick = {()=>this.toggleMakeManagerModal()}>{employee.manager ? "Demote" : "Make a manager"}</Button>
                </div>
            </Collapse>
      
      {/* Modal for removing an employee */}
        <Modal toggle = {this.toggleModal} open ={this.state.modalIsOpen}>
            <ModalHeader style={{backgroundColor:"#DD4124", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>Warning</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <p className="f3">Are you sure you want to remove</p>
                <h3>{employee.lastName +" "+ employee.firstName + " ?"}</h3>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                <Button onClick={()=>this.removeEmployee(employee)}>Yes, remove</Button>
                <Button onClick={()=>this.toggleModal()}>No</Button>
            </ModalFooter>
        </Modal>


      {/* Modal warning last admin */}
      <Modal toggle = {this.toggleLastAdminModal} open ={this.state.lastAdminModal}>
            <ModalHeader style={{backgroundColor:"#DD4124", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>Warning</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <h3>You cannot demote the last manager remaining!</h3>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                <Button onClick={()=>this.toggleLastAdminModal()}>Ok</Button>
            </ModalFooter>
        </Modal>

        {/* Modal for making an employee manager */}
        <Modal toggle = {this.toggleMakeManagerModal} open ={this.state.modalMakeManager}>
            <ModalHeader style={{backgroundColor:"#3682f5", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>{employee.manager?"Demote":"Promote to Manager"}</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <p className="f3">{employee.manager?"Demote":"Promote"} employee:</p>
                <h3>{employee.lastName +" "+ employee.firstName + " ?"}</h3>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                <Button onClick={employee.manager? ()=>this.demoteEmployee(employee):()=>this.promoteEmployee(employee)}>{employee.manager?"Yes, demote":"Yes, propmote"}</Button>
                <Button onClick={()=>this.toggleMakeManagerModal()}>No</Button>
            </ModalFooter>
        </Modal>




        </div>
    )
    }
}

export default EmployeeCard