import React from "react";
import 'tachyons';
import {Button} from "shards-react";
import EmployeeForm from '../../components/employeeForm/employeeForm'
import EmployeeCard from "../../components/employeeCard/employeeCard"
import {firestore, getAllEmployees } from "../../firebase/utils";


class EmployeesDashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen:false,
      employees:[]

    }
  }
  
  toggleModal= () =>{
    this.setState({modalOpen:!this.state.modalOpen});
   
    
  }
 

  componentDidMount(){
    
    const promise = new Promise((res, rej)=>{
      res(getAllEmployees());
    });
    promise.then(val =>this.setState({employees:[...this.state.employees,...val]}));
  }

  componentDidUpdate(){
    const promise = new Promise((res, rej)=>{
      res(getAllEmployees());
    });
    promise.then(val => {
      if (val.length>this.state.employees.length){
        this.setState({employees:[...val]})
      }
    });
  }
  

  render(){

    
   var cards = [];
   if(this.state.employees.length > 0){
      cards = this.state.employees.map((data,i)=>{
        return(<EmployeeCard key={i} data ={data}></EmployeeCard>)
      })
   }
   
    return (
    <div>
  
     <EmployeeForm open = {this.state.modalOpen} toggle = {this.toggleModal} ></EmployeeForm>

      <div className="flex w-100 vh-100 justify-around" >
          <div className=" bg-green w-20 h-10 flex items-center">
                <Button style = {{margin:"auto"}}size ="lg" theme="success" onClick ={()=>this.toggleModal()}>Add Employee</Button>
          </div>
          <div style = {{zIndex:"0",overflow:"scroll"}} className="bg-blue w-100 h-100  items-center ">
               {cards}
          </div >

      </div>
      </div>
    );
  }
};


export default EmployeesDashboard;
