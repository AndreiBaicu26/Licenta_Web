import React from "react";
import {Card, CardBody, Button, Collapse,  Modal, ModalBody, ModalHeader, ModalFooter} from "shards-react";

import "tachyons"
import "../../styles/toggleStyle.css"
import { removeProduct } from "../../firebase/utils";


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
            modalIsOpen:false
        }
    }


    toggleCollapse = () =>{
        this.setState({collapse:!this.state.collapse});
    }

    toggleModal = ()=>{
        this.setState({modalIsOpen:!this.state.modalIsOpen});
    }

    removeProduct = async (product)=>{
        if(await removeProduct(product)===true){
            alert("Product removed")
            this.toggleModal();
        }
}

    render(){

        const product = this.props.data;
    return(
        <div>
            <Card style ={{zIndex:"2",maxWidth:"80%", marginTop:"20px", marginLeft:"10%"}} small>
                                
                <CardBody>
                <div className="flex justify-between items-center">
                    <h2>{product.name }</h2>
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
                        <li><span>Product Name :</span>  {product.name}</li>
                        <li><span>Max number of players :</span> {product.noOfPlayers}</li>
                        <li><span>Price :</span> {product.price}</li>
                        <li><span>FOH : </span>{product.foh}</li>
                        <li><span>BOH :</span> {product.boh}</li>
                        <li><span>Size: </span>{product.size.toUpperCase()}</li>
                        <li><span>Code : </span>{product.documentId}</li>
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
                <h3>{product.name + " ?"}</h3>
            </ModalBody>
            <ModalFooter style={{justifyContent:"space-around"}}>
                <Button onClick={()=>this.removeProduct(product)}>Yes, remove</Button>
                <Button onClick={()=>this.toggleModal()}>No</Button>
            </ModalFooter>
        </Modal>
        </div>
    )
    }
}

export default ProductCard;