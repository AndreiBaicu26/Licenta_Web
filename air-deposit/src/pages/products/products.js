import React from "react";
import "tachyons";
import {Button} from "shards-react";
import ProductForm from "../../components/productForm/productForm";

class ProductsDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen:false
    };
  }


  toggleModal= () =>{
    this.setState({modalOpen:!this.state.modalOpen});
   
  }



  render() {
    return (
      <div>
        <ProductForm
          open={this.state.modalOpen}
          toggle={this.toggleModal}
        ></ProductForm>

        <div className="flex w-100 vh-100 justify-around">
          <div className=" bg-green w-20 h-10 flex items-center">
            <Button
              style={{ margin: "auto" }}
              size="lg"
              theme="success"
              onClick={()=>this.toggleModal()}
            > Add new product
            </Button>
          </div>
          <div
            style={{ zIndex: "0", overflow: "scroll" }}
            className="bg-blue w-100 h-100  items-center "
          >
            <h1>Products</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsDashboard;
