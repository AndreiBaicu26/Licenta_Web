import React from "react";
import {Card, CardBody, Button, Collapse,  Modal, ModalBody, ModalHeader, ModalFooter, FormInput } from "shards-react";
import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";


import "tachyons"
import "../../styles/toggleStyle.css"
import { removeProduct,functions } from "../../firebase/utils";


const collapseStyle = {
    zIndex:"1",
    maxWidth:"80%",
    marginTop:"-20px", 
    marginLeft:"11%",
    marginRight:"11%"
}

class ProductCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            collapse: false,
            modalIsOpen:false,
            createAlertModal:false,
            loadingModal:false,
            loadingModalText:"Creating your alert..",
            loadingModalOkButton: true,
            cantDeleteProductModal:false
        }
    }

    toggleLoadingModal = ()=>{
        this.setState({loadingModal:!this.state.loadingModal});
    }

    loadingModalTextChange = (text)=>{
        this.setState({loadingModalText:text,loadingModalOkButton:false });
    }
   
    toggleCantDeleteProductModal = () =>{
        this.setState({cantDeleteProductModal:!this.state.cantDeleteProductModal});
    }

    toggleCollapse = () =>{
        this.setState({collapse:!this.state.collapse});
    }

    toggleModal = ()=>{
        this.setState({modalIsOpen:!this.state.modalIsOpen});
    }

    toggleCreateAlertModal = ()=>{
        this.setState({createAlertModal:!this.state.createAlertModal});
    }

  
    handleCreateAlertCLick = (event,product)=>{
       console.log(product);
        const a = document.getElementById("#numberAlert");

        try{
           const value =  parseInt(a.value);
           if(isNaN(value)) throw Error("This is not a number");   
           
           if(value < 0 ) throw Error("No negative numbers");
           this.toggleCreateAlertModal();
            this.toggleLoadingModal();
            
            const addAlertToProduct = functions.httpsCallable('addAlertToProduct');
            addAlertToProduct({alertAt: value,id: product.documentId})
                 .then(result =>{
                
               if(result.data === true) this.loadingModalTextChange("Success");
               if(result.data === false) this.loadingModalTextChange("Error while setting alert");
               
              
            });
            
          
        }catch(err){
            alert(err.message);
        }

    }

    removeProduct = async (product)=>{
        this.toggleModal();
        console.log(Object.keys(product.placesDeposited).length)
        if(Object.keys(product.placesDeposited).length>0){ 
            this.toggleCantDeleteProductModal();
        
            return
        }else{
            if(await removeProduct(product)===true){
                alert("Product removed")
               
            }
        }
        
}

    render(){


        const product = this.props.data;
        let storedLocations = [];
        for(let key of Object.keys(product.placesDeposited)){
            storedLocations.push(<h3>{key}</h3>);
        }

    return(
        <div>
            <Card style ={{zIndex:"2",maxWidth:"80%", marginTop:"20px", marginLeft:"10%"}} small>
                                
                <CardBody>
                <div className="flex justify-between items-center">
                    <h2>{product.name }</h2>
                    <div>
                        <Button className="mr-3" onClick = {()=>this.toggleCollapse()}>More Info</Button>
                        <Button theme="danger mr-3" onClick = {()=>this.toggleModal()}>Remove</Button>
                        <Button theme="warning" className =".white" onClick = {()=>this.toggleCreateAlertModal()} >Create alert</Button>
                    </div>
                 </div>
                </CardBody>
                
            </Card>
            <Collapse style ={collapseStyle} open={this.state.collapse}>
          
                <div className="p-3 mt-3 ba b--light-gray br3 bg-near-white">
                    <ul style={{textAlign:"left", columnCount:"2"}}>
                        <li><span>Product Name :</span>  {product.name}</li>
                        <li><span>Max number of players :</span> {product.noOfPlayers}</li>
                        <li><span>Price :</span> {product.price}</li>
                        <li><span>FOH : </span>{product.foh}</li>
                        <li><span>BOH :</span> {product.boh}</li>
                        <li><span>Size: </span>{product.size.toUpperCase()}</li>
                        <li><span>Code : </span>{product.documentId}</li>
                        <li><span>Alert me at : </span>{product.alertAt}</li>
                        </ul>
                </div>

            </Collapse>
      
        {/* Deleting a product modal */}
        <Modal toggle = {this.toggleModal} open ={this.state.modalIsOpen}>
            <ModalHeader style={{backgroundColor:"#DD4124", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>Warning</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <p className="f3">Are you sure you want to remove</p>
                <h3>{product.name + " ?"}</h3>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                <Button onClick={()=>this.removeProduct(product)}>Yes, remove</Button>
                <Button onClick={()=>this.toggleModal()}>No</Button>
            </ModalFooter>
        </Modal>


         {/* Adding a warning to a product modal */}
         <Modal toggle = {this.toggleCreateAlertModal} open ={this.state.createAlertModal}>
            <ModalHeader style={{backgroundColor:"#ffcc00", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>Create alert</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                <p className="f3">Insert a number to be alerted when {product.name} has a low stock</p>
                <FormInput id = "#numberAlert"/>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                    
                <Button onClick={()=>this.toggleCreateAlertModal()}>Cancel</Button>
                <Button onClick = {(e)=>this.handleCreateAlertCLick(e,product)}>Create Alert</Button>
            </ModalFooter>
        </Modal>

        {/* Loading... modal */}
        <Modal toggle = {this.toggleLoadingModal} open ={this.state.loadingModal}>
        <ModalHeader style={{backgroundColor:"blue", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>{this.state.loadingModalText}</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                {this.state.loadingModalOkButton===true ? <SemipolarLoading speed = {"1"}size={"large"} color={"black"}></SemipolarLoading>:
                <h1></h1>}
                
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                    
                    <Button disabled ={this.state.loadingModalOkButton} onClick={()=>this.toggleLoadingModal()}>Ok</Button>
                    
                </ModalFooter>
        </Modal>


        {/* Can t delete product Modal */}

        <Modal toggle = {this.toggleCantDeleteProductModal} open ={this.state.cantDeleteProductModal}>
        <ModalHeader style={{backgroundColor:"#DD4124", display:"inline-block"}}>
                <div className="w-100 h-100 tc">
                <h3 className={"white"} style={{align:"center"}}>Can't remove this product</h3>
                </div>
            </ModalHeader>
            <ModalBody>
                
            <p className="f3">{product.name} is still stored in the following storage spaces:</p>
            {storedLocations}
            <p className="f3">Please remove the product from these storage spaces, and then proceed with deleteing it.</p>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                    
                    <Button onClick={()=>this.toggleCantDeleteProductModal()}>Ok</Button>
                    
                </ModalFooter>
        </Modal>

        </div>
    )
    }
}

export default ProductCard;