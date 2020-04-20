import React from "react";
import {Card, CardBody, Button, Collapse,  Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";

import "tachyons"
import "./employeeCard.css"
import { removeEmployee } from "../../firebase/utils";

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
            modalIsOpen:false
        }
    }


    toggleCollapse = () =>{
        this.setState({collapse:!this.state.collapse});
    }

    toggleModal = ()=>{
        this.setState({modalIsOpen:!this.state.modalIsOpen});
    }

    removeEmployee = async (e)=>{
        if(await removeEmployee(e)===true){
           
            alert("Employee removed")
            this.toggleModal();
            
        }else
            alert("Failed while removing employee")
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
                <div className="p-3 mt-3 ba b--light-gray br3 bg-near-white">
                    <ul style={{textAlign:"left", columnCount:"2"}}>
                        <li><span>First Name :</span>  {employee.firstName}</li>
                        <li><span>Last Name :</span> {employee.lastName}</li>
                        <li><span>CNP :</span> {employee.cnp}</li>
                        <li><span>Email : </span>{employee.email}</li>
                        <li><span>Phone :</span> {employee.phone}</li>
                        <li><span>User ID : </span>{employee.id}</li>
                    </ul>
                </div>
            </Collapse>
      
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
        </div>
    )
    }
}

export default EmployeeCard