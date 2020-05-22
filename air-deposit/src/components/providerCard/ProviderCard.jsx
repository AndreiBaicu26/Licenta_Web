import React from "react";
import {Card, CardBody, Button, Collapse,  Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";
import "tachyons"
import "../../styles/toggleStyle.css"
import { removeProvider} from "../../firebase/utils";
import { userLogged } from "../signin/signin";

const collapseStyle = {
    zIndex:"1",
    maxWidth:"80%",
    marginTop:"-20px", 
    marginLeft:"11%",
    marginRight:"11%"
}




class ProviderCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            modalIsOpen:false,
           
           
        }
    }


    toggleCollapse = () =>{
        this.setState({collapse:!this.state.collapse});
    }


    toggleModal = ()=>{
        this.setState({modalIsOpen:!this.state.modalIsOpen});
    }


    removeProvider = async (provider)=>{
        this.toggleModal();
        if(await removeProvider(provider)===true){
            
            alert("Provider removed")
            
        }else{
            alert("Error while removing provide")
        }
    }


    render(){
      
        const provider = this.props.data;
    return(
        <div>
            <Card style ={{zIndex:"2",maxWidth:"80%", marginTop:"20px", marginLeft:"10%"}} small>
                                
                <CardBody>
                <div className="flex justify-between items-center">
                    <h2>{provider.name}</h2>
                    <div>
                        <Button className="mr-3" onClick = {()=>this.toggleCollapse()}>More Info</Button>
                        <Button theme="danger" onClick = {()=>this.toggleModal()}>Remove</Button>
                    </div>
                 </div>
                </CardBody>
                
            </Card>
            <Collapse style ={collapseStyle} open={this.state.collapse}>
                <div className="flex justify-between items-center  p-3 mt-3 ba b--light-gray br3 bg-near-white">
                    <ul style={{textAlign:"left", columnCount:"3"}}>
                        <li><span>Name :</span>  {provider.name}</li>
                        <li><span>Email :</span> {provider.email}</li>
                        <li><span>Phone :</span> {provider.phone}</li>
                    </ul>
                </div>
            </Collapse>
      

      {/* Modal for removing a provider */}
        <Modal toggle = {this.toggleModal} open ={this.state.modalIsOpen}>
            <ModalHeader style={{backgroundColor:"#DD4124", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>Warning</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <p className="f3">Are you sure you want to remove</p>
                <h3>{provider.name +" ?"}</h3>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                <Button onClick={()=>this.removeProvider(provider)}>Yes, remove</Button>
                <Button onClick={()=>this.toggleModal()}>No</Button>
            </ModalFooter>
        </Modal>



        </div>
    )
    }
}

export default ProviderCard