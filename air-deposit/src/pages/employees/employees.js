import React from "react";
import 'tachyons';
import {Button} from "shards-react";
import EmployeeForm from '../../components/employeeForm/employeeForm'
import EmployeeCard from "../../components/employeeCard/employeeCard"
import {firestore } from "../../firebase/utils";
import { SemipolarLoading } from 'react-loadingg';

class EmployeesDashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen:false,
      employees:[],
      noData:false

    }
  }
  
  toggleModal= () =>{
    this.setState({modalOpen:!this.state.modalOpen});
   
  }


  arrayOfEmployees = [];
 componentDidMount(){
    
    
    firestore.collection("employees").onSnapshot(sap=>{
     
      let c = sap.docChanges();
       this.arrayOfEmployees = Array.from(this.state.employees);
      
      c.forEach(change=>{
        
        if(change.type ==="added"){ 
          this.setState({removed:false})    
          this.arrayOfEmployees.push(change.doc.data())        
        }else{
          if(change.type==="removed"){  

           
            let itemToBeRemoved = this.arrayOfEmployees.find(element => element.cnp === change.doc.data().cnp);         
            let index = this.arrayOfEmployees.indexOf(itemToBeRemoved);
            
            this.arrayOfEmployees.splice(index,1);
          
          }
        }
         
      })
      
      if(this.arrayOfEmployees.length === 0){
        this.setState({employees:this.arrayOfEmployees, noData:true})
        
      }else{ 
        
        this.setState({employees:this.arrayOfEmployees, noData:false})
      }

    })
  }
  


  render(){

    
   var cards = [];
   if(this.state.employees.length > 0){
      cards = this.state.employees.map((data,i)=>{
        return(<EmployeeCard remove = {this.employeeRemoved} key={i} data ={data}></EmployeeCard>)
      })
   }else if(this.state.noData===false){
     cards = <SemipolarLoading speed = {"0.7"}size={"large"} color={"#eeeeee"}></SemipolarLoading>
   }else{
     cards = <h1>No employees</h1>
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
