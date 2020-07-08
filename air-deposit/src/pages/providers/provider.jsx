import React from "react";
import "tachyons";
import {Button} from "shards-react";


import ProviderForm from "../../components/providerForm/ProviderForm";
import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";
import { firestore} from "../../firebase/utils";
import ProviderCard from "../../components/providerCard/ProviderCard";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const search = <FontAwesomeIcon icon={faSearch} />



class ProvidersDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
      providerModalOpen:false,
      noData:false,
      inputText: "",
      providers:[]
    };
  }

  handleTextChange = (e) =>{
    this.setState({inputText:e.target.value});
  }


  toggleProviderModal = () =>{
    this.setState({providerModalOpen:!this.state.providerModalOpen});
  }

 
  arrayOfProviders = [];

  componentDidMount(){
    
    firestore.collection("providers").onSnapshot(snap=>{
     
      let c = snap.docChanges();
       this.arrayOfProviders = Array.from(this.state.providers);
    
      c.forEach(change=>{
        
        if(change.type ==="added"){
         
          this.arrayOfProviders.push(change.doc.data())        
        }else{
          if(change.type==="removed"){  

            let itemToBeRemoved = this.arrayOfProviders.find(element => element.name === change.doc.data().name);         
            let index = this.arrayOfProviders.indexOf(itemToBeRemoved);      
            this.arrayOfProviders.splice(index,1);
          
          }else{
              if(change.type==="modified")
              {
                let itemToBeUpdated = this.arrayOfProviders.find(element => element.name === change.doc.data().name);         
                let index = this.arrayOfProviders.indexOf(itemToBeUpdated);
                this.arrayOfProviders[index] = change.doc.data();
          }}
        }
         
      })
      
      if(this.arrayOfProviders.length === 0){

        this.setState({providers:this.arrayOfProviders, noData:true})  

      }else{ 
         
        this.setState({providers:this.arrayOfProviders, noData:false})
      }

    })

  
  }


  render() {
    
    var cards = []
  
    if(this.state.providers.length > 0){ 

        cards = this.state.providers.map((data,i)=>{  
          if(data.name.toUpperCase().includes(this.state.inputText.toUpperCase())){
            return(<ProviderCard key={i} data ={data}/>)
          }

          })

    }else if(this.state.noData===false){
      cards = <SemipolarLoading speed = {"0.7"}size={"large"} color={"#eeeeee"}></SemipolarLoading>
    }else{
      cards = <h1>No Providers</h1>
    }
   
    return (
      <div>
        <ProviderForm
          open = {this.state.providerModalOpen}
          toggle = {this.toggleProviderModal}
        />
        
        <div className="flex w-100 vh-100 justify-around">
          <div className=" bg-green w-20 h-10 flex flex-column items-center justify-center">
            <Button
              style ={{marginTop:"2.5rem"}}
              size="lg"
              onClick={()=>this.toggleProviderModal()}
            > Add new provider
            </Button>
          </div>

          <div style = {{zIndex:"0",overflow:"scroll"}} className="bg-blue w-100 h-100  items-center ">
               
               <div>
                 <input onChange={(e)=>this.handleTextChange(e)} placeholder="Search name of provider..." class="Search-box" id="Search-box" autocomplete="off" ></input>
                 {search}
             
                 </div>
                    {cards}
                    
               </div >
        </div>
      </div>
    );
  }
}

export default ProvidersDashboard;
