import React from "react";
import "tachyons";
import {
  FormFeedback,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormInput,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormRadio,
  FormSelect,
  ModalFooter
} from "shards-react";
import { saveProduct } from "../../firebase/utils";
import Product from "../../classes/product";
import "../../styles/form.css"



const initState = {
  selectedSize: "small",
  open:false,
  prodName:{ 
        invalid:false,
        prodNameValue:""
  },
  numPlayers: {
        invalid:false,
        numPlayersValue:""
   },
  price:{ 
        invalid:false,
        priceValue:""
},
  foh:{ 
        invalid: false,
        value:""
},
  barcode:{
    invalid:false,
    value:""
  }
}

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = initState;
  
    
  }

  componentWillMount() {
    this.setState({ open: this.props.open });
  }



  validate=()=>{

    const {prodName, foh,price, numPlayers, barcode} = this.state;
   
    if(prodName.invalid === false && 
        
        foh.invalid===false && 
        price.invalid===false && 
        numPlayers.invalid===false &&
        numPlayers.invalid===false){
        if(prodName.prodNameValue.length> 0 &&
        foh.value.length> 0 &&
        
        numPlayers.numPlayersValue.length > 0 &&
        price.priceValue.length >0  &&
        barcode.value.length > 0){
            return true;
        }
    }
    return false;
  }

  saveProduct= async()=>{
    const {prodName, boh, foh,price, numPlayers,barcode} = this.state;
      if(this.validate()){
         let p = new Product(prodName.prodNameValue,
         parseInt(numPlayers.numPlayersValue),
         parseFloat(price.priceValue),
         parseInt(foh.value),
         0,
         this.state.selectedSize,
         barcode.value,0);
         let a =[];
         var select = document.getElementById("providersSelect");
         var optionSelected = select.options[select.selectedIndex].value;
      
        const index = this.props.providers.findIndex((value,index,arr)=>{
            return value.name === optionSelected;
         });
         const providerSelected = this.props.providers[index];
         p.addProvider(providerSelected);
         if(await saveProduct(p)===true){
           alert("Product added");
           this.props.toggle();
         }else{
          alert("Product already exists")
         }
        
      }
  }

  changeSize=(size)=>{
    this.setState({selectedSize:size})
  }


  changeState() {
    
    this.setState(initState)
    this.setState({ open: true });
  }


  handleNameChange=(e)=>{
   
    if(e.target.value.length < 2){
        this.setState({prodName:{invalid:true, prodNameValue:e.target.value}})
    }else{
        this.setState({prodName:{invalid:false,prodNameValue:e.target.value}})
    }
  }

  handleNumPlayersChange=(e)=>{
    e.target.value=parseInt(e.target.value).toString();
    
    if(e.target.value <= 1){   
        this.setState({numPlayers:{invalid:true,numPlayersValue:e.target.value}})
    }else {
        this.setState({numPlayers:{invalid:false,numPlayersValue:e.target.value}})
    }
  }

  handlePriceChange=(e)=>{
        
        e.target.value=Number(e.target.value).toString();
     
        if(e.target.value <=0){
            this.setState({price:{invalid:true,priceValue:e.target.value}})
        }else
                this.setState({price:{invalid:false,priceValue:e.target.value}})
        
  }

  handleStockChange=(e)=>{
        e.target.value=parseInt(e.target.value).toString();

        if(e.target.value <0){
            console.log(e.target.name)
            this.setState({[e.target.name]:{invalid:true,value:e.target.value}})
        }else
            this.setState({[e.target.name]:{invalid:false,value:e.target.value}})
  }

  render() {
    let providerOptions = [];
    
    if(this.props.providers.length > 0){
      providerOptions = this.props.providers.map((provider,i)=>{
        return (<option value ={provider.name} key ={i}>{provider.name}</option>)
      })
    }else{
      providerOptions =  (<option value = {null}>No providers in database</option>)
    }

    if (this.props.open === true && this.state.open === false) {
      
      this.changeState();
    } else if (this.props.open === false && this.state.open === true) {
      this.setState({ open: false });
    }
   
    
    return (
      <div>
        <Modal size="sm" open={this.props.open} toggle={this.props.toggle}>
          <ModalHeader>Insert Product Info</ModalHeader>
          <ModalBody>
            <Form>

            <FormGroup row={true}>
                <FormInput
                  onChange = {event =>this.handleNameChange(event)}
                  className=""
                  type="text"
                  placeholder="Product name"
                  name="prodName"
                  invalid = {this.state.prodName.invalid}
                ></FormInput>

                <label className="ml3 mb0" htmlFor="prodName">
                  Product Name
                </label>
                <FormFeedback invalid>Not a valid name</FormFeedback>
              </FormGroup>

              <FormGroup row={true}>
                <FormInput
                    onChange = {event =>this.handleNumPlayersChange(event)}
                  className=""
                  type="number"
                  placeholder="No. of players"
                  name="numPlayers"
                  invalid = {this.state.numPlayers.invalid}
                ></FormInput>
                <label className="ml3 mb0" htmlFor="numPlayers">
                  Number of players
                </label>
                <FormFeedback invalid>Value must be greater than 1</FormFeedback>
              </FormGroup>

            <FormGroup row={true}>
              <InputGroup className="">
                <InputGroupAddon type="prepend">
                  <InputGroupText>LEI</InputGroupText>
                </InputGroupAddon>
                <FormInput  
                    onChange = {event =>this.handlePriceChange(event)}
                    invalid = {this.state.price.invalid} 
                    type="number" 
                    name = "price" 
                    placeholder="Price" />
                <FormFeedback invalid>Value must be greater than 0</FormFeedback>
              </InputGroup>
              
              <label className="ml3 mb0" htmlFor="price">Price</label>
            </FormGroup>

              <FormGroup row={true}>
                <FormInput
                onChange = {event =>this.handleStockChange(event)}
                  className=""
                  type="number"
                  placeholder="FOH"
                  name="foh"
                  invalid = {this.state.foh.invalid}
                ></FormInput>
                <label className="ml3 mb0" htmlFor="foh">
                  Front of House
                </label>
                <FormFeedback invalid>Value can't be negative</FormFeedback>
              </FormGroup>

              {/* <FormGroup row={true}>
                <FormInput
                onChange = {event =>this.handleStockChange(event)}
                  className=""
                  type="number"
                  placeholder="BOH"
                  name="boh"
                  invalid = {this.state.boh.invalid}
                ></FormInput>
                <label className="ml3 mb0" htmlFor="boh">
                  Back of House
                </label>
                <FormFeedback invalid>Value can't be negative</FormFeedback>
              </FormGroup> */}

              <div className ="radioButtonsSize">
                    <p className="mb-2">Select product size: </p>
                    <div className="flex flex-column tl">
                    <FormRadio
                      
                        name="size"
                        checked={this.state.selectedSize === "small"}
                        onChange={() => {
                        this.changeSize("small");
                        }}
                    >
                        Small
                    </FormRadio>
                    <FormRadio
                        
                        name="size"
                        checked={this.state.selectedSize === "medium"}
                        onChange={() => {
                        this.changeSize("medium");
                        }}
                    >
                        Medium
                    </FormRadio>
                    <FormRadio
                       
                        name="size"
                        checked={this.state.selectedSize === "large"}
                        onChange={() => {
                        this.changeSize("large");
                        }}
                    >
                        Large
                    </FormRadio>
                    </div>
                </div>

                <FormGroup row={true}>
                <FormInput
                onChange = {event =>this.handleStockChange(event)}
                  className=""
                  type="number"
                  placeholder="Barcode"
                  name="barcode"
                  invalid = {this.state.barcode.invalid}
                ></FormInput>
                <label className="ml3 mb0" htmlFor="barcode">
                  Barcode
                </label>
                <FormFeedback invalid>Value can't be negative</FormFeedback>
              </FormGroup>


              <label htmlFor="providers">
                 Select a provider
              </label>
              <FormSelect id = "providersSelect" name ="providers">
                {providerOptions}
              </FormSelect>
              
            </Form>

              <ModalFooter>
              <div className="w-100 h-100 flex justify-center">
              <Button
                style={{
                  backgroundColor: "DodgerBlue",
                  color: "#fff",
                }}
                 onClick={()=>this.saveProduct()}
              >Submit
              </Button>
              </div>
              </ModalFooter>
            
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ProductForm;
