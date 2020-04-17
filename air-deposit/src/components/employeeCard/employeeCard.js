import React from "react";
import {Card, CardBody, Button, Collapse} from "shards-react";
import "tachyons"
import "./employeeCard.css"

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
            collapse: false
        }
    }


    toggleCollapse = () =>{
        this.setState({collapse:!this.state.collapse})
    }


    render(){

        const employee = this.props.data;
    return(
        <div>
            <Card style ={{zIndex:"2",maxWidth:"80%", marginTop:"20px", marginLeft:"10%"}} small>
                                
                <CardBody>
                <div className="flex justify-around">
                    <h2>{employee.firstName + " " + employee.lastName}</h2>
                    <Button onClick = {()=>this.toggleCollapse()}>Toggle</Button>
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
        </div>
    )
    }
}

export default EmployeeCard