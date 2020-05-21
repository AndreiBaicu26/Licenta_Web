import React from "react";
import "tachyons";
import {Button, FormInput} from "shards-react";
import ProductCard from "../../components/productCard/productCard";
import ProductForm from "../../components/productForm/productForm"
import ProviderForm from "../../components/providerForm/ProviderForm";
import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";
import { firestore } from "../../firebase/utils";
import Product from "../../classes/product";
import "./products.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const search = <FontAwesomeIcon icon={faSearch} />

class ProductsDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen:false,
      providerModalOpen:false,
      products: [],
      noData:false,
      inputText: ""
    };
  }

  handleTextChange = (e) =>{
    this.setState({inputText:e.target.value});
  }

  toggleModal= () =>{
    this.setState({modalOpen:!this.state.modalOpen});
   
  }

  toggleProviderModal = () =>{
    this.setState({providerModalOpen:!this.state.providerModalOpen});
  }

  arrayOfProducts = [];

  componentDidMount(){
    
    firestore.collection("products").onSnapshot(snap=>{
     
      let c = snap.docChanges();
       this.arrayOfProducts = Array.from(this.state.products);
    
      c.forEach(change=>{
        
        if(change.type ==="added"){
          var p = new Product(change.doc.data().name, change.doc.data().noOfPlayers,change.doc.data().price,change.doc.data().foh,change.doc.data().boh,change.doc.data().size,change.doc.id,change.doc.data().alertAt);
  
          p.addDeposit((change.doc.data().placesDeposited))
            
          this.arrayOfProducts.push(p)        
        }else{
          if(change.type==="removed"){  

            let itemToBeRemoved = this.arrayOfProducts.find(element => element.documentId === change.doc.data().documentId);         
            let index = this.arrayOfProducts.indexOf(itemToBeRemoved);
            
            this.arrayOfProducts.splice(index,1);
          
          }else{if(change.type==="modified"){
            let itemToBeUpdated = this.arrayOfProducts.find(element => element.documentId === change.doc.data().documentId);         
            let index = this.arrayOfProducts.indexOf(itemToBeUpdated);
            this.arrayOfProducts[index] = change.doc.data();
          }}
        }
         
      })
      
      if(this.arrayOfProducts.length === 0){
        this.setState({products:this.arrayOfProducts, noData:true})   
      }else{ 
        this.setState({products:this.arrayOfProducts, noData:false})
      }

    })
  }

 
  render() {
   
    var cards = []
  
    if(this.state.products.length > 0){ 

        cards = this.state.products.map((data,i)=>{
          console.log(data)
          if(data.name.toUpperCase().includes(this.state.inputText.toUpperCase())){
            return(<ProductCard key={i} data ={data}></ProductCard>)
          }
          })

    }else if(this.state.noData===false){
      cards = <SemipolarLoading speed = {"0.7"}size={"large"} color={"#eeeeee"}></SemipolarLoading>
    }else{
      cards = <h1>No Products</h1>
    }
   
    return (
      <div>
        <ProductForm
          open={this.state.modalOpen}
          toggle={this.toggleModal}
        />

        <ProviderForm
          open = {this.state.providerModalOpen}
          toggle = {this.toggleProviderModal}
        />
        
        <div className="flex w-100 vh-100 justify-around">
          <div className=" bg-green w-20 h-10 flex flex-column items-center justify-center">
            <Button
              
              size="lg"
              theme="success"
              onClick={()=>this.toggleModal()}
            > Add new product
            </Button>
            <Button
              style ={{marginTop:"2.5rem"}}
              size="lg"
              onClick={()=>this.toggleProviderModal()}
            > Add new provider
            </Button>
          </div>
          <div
            style={{ zIndex: "0", overflow: "scroll" ,overflowX: "hidden"}}
            className="bg-blue w-100 h-100  items-center "
          >
          <div>
            <input onChange={(e)=>this.handleTextChange(e)} placeholder="Search barcode or name..." class="Search-box" id="Search-box" autocomplete="off" ></input>
            {search}
        
            </div>
            {cards}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsDashboard;
