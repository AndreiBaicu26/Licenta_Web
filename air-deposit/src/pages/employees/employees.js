import React from "react";
import 'tachyons';
import {Button} from "shards-react";
import EmployeeForm from '../../components/employeeForm/employeeForm'
import EmployeeCard from "../../components/employeeCard/employeeCard"
import {firestore } from "../../firebase/utils";
import { SemipolarLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const search = <FontAwesomeIcon icon={faSearch} />
class EmployeesDashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen:false,
      employees:[],
      noData:false,
      inputText: "",

    }
  }

  handleTextChange = (e) =>{
    this.setState({inputText:e.target.value});
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

          this.arrayOfEmployees.push(change.doc.data())        
        }else{
          if(change.type==="removed"){  
  
            let itemToBeRemoved = this.arrayOfEmployees.find(element => element.cnp === change.doc.data().cnp);         
            let index = this.arrayOfEmployees.indexOf(itemToBeRemoved);
            
            this.arrayOfEmployees.splice(index,1);
          
          }else{
            if(change.type==="modified"){  
  
              let itemToBeUpdated = this.arrayOfEmployees.find(element => element.cnp === change.doc.data().cnp);         
              let index = this.arrayOfEmployees.indexOf(itemToBeUpdated);
              this.arrayOfEmployees[index] = change.doc.data();
              
          }
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
        if(data.firstName.toUpperCase().includes(this.state.inputText.toUpperCase())||
        data.lastName.toUpperCase().includes(this.state.inputText.toUpperCase()) ){
        return(<EmployeeCard  key={i} data ={data} onSignIn={this.props.onSignIn} ></EmployeeCard>)
        }
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
               
          <div>
            <input onChange={(e)=>this.handleTextChange(e)} placeholder="Search name of employee..." class="Search-box" id="Search-box" autocomplete="off" ></input>
            {search}
        
            </div>
               {cards}
               
          </div >

      </div>
      </div>
    );
  }
};


export default EmployeesDashboard;
