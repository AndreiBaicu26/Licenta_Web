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
  FormRadio
} from "shards-react";
import { saveProduct } from "../../firebase/utils";
import Product from "../../classes/product";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSize: "small",
      open:{ 
            invalid: false,
            openValue:""
      },
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
      boh:{
            invalid: false,
            value:""
    }
    };
  }

  componentWillMount() {
    this.setState({ open: this.props.open });
  }

  //   saveEmployee=async ()=>{

  //     const {email, fName, lName, cnp} = this.state;
  //     if(cnp.cnpValid && fName.fNameValid && lName.lNameValid && email.emailValid){
  //         const employee={
  //           firstName:document.getElementById("fName").value,
  //           lastName:document.getElementById("lName").value,
  //           phone:document.getElementById("phone").value,
  //           email:document.getElementById("email").value,
  //           cnp:document.getElementById("cnp").value
  //         }
  //       try{
  //         await saveEmployee(employee);

  //         alert("Employee added succsessfully")
  //         this.props.toggle();

  //       }catch(err)
  //       {
  //         console.log(err);
  //        alert("Employee already in database")

  //       }

  //   }
  //   }

  validate=()=>{

    const {prodName, boh, foh,price, numPlayers} = this.state;
    console.log("-------------" + prodName)
    if(prodName.invalid === false && 
        boh.invalid=== false && 
        foh.invalid===false && 
        price.invalid===false && 
        numPlayers.invalid===false){
        if(prodName.prodNameValue.length> 0 &&
        foh.value.length> 0 &&
        boh.value.length > 0 &&
        numPlayers.numPlayersValue.length > 0 &&
        price.priceValue.length > 0){
            return true;
        }
    }
    return false;
}

  saveProduct=()=>{
    const {prodName, boh, foh,price, numPlayers} = this.state;
      if(this.validate()){
         let p = new Product(prodName.prodNameValue,
         numPlayers.numPlayersValue,
         price.priceValue,
         foh.value,
         boh.value,
         this.state.selectedSize)
         saveProduct(p)
         this.props.toggle();
      }
  }

  changeSize=(size)=>{
    this.setState({selectedSize:size})
  }
  changeState() {
    // this.setState({email:{
    //   emailValid: false,
    //   emailInvalid: false
    // },
    // fName:{
    //   fNameValid:false,
    //   fNameInvalid:false
    // },
    // lName:{
    //   lNameValid:false,
    //   lNameInvalid:false
    // },
    // cnp:{
    //   cnpValid:false,
    //   cnpInvalid:false
    // }})
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
    // if (this.props.open === true && this.state.open === false) {
    //   this.setState({ open: true });
    // //   this.changeState();
    // } else if (this.props.open === false && this.state.open === true) {
    //   this.setState({ open: false });
    // }
    console.log(this.state.prodName);
    
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

              <FormGroup row={true}>
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
              </FormGroup>

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
              <Button
                style={{
                  backgroundColor: "DodgerBlue",
                  color: "#fff",
                }}
                 onClick={()=>this.saveProduct()}
              >Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ProductForm;
