import React from "react";


import { FormRadio } from "shards-react";

export default class PlacesDepositedRadio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDeposit: null
    };

  }

  changePlace(place) {
      this.props.selectedStorage(place);
      this.setState({
        selectedDeposit: place
    });
  }

  render() {

    console.log(this.props);
    var storedLocations =[];
    for (let key of Object.keys(this.props.product.placesDeposited)) {
      storedLocations.push(key);
    }

    console.log(storedLocations)
    var radios  = [];
   radios =  storedLocations.map((value,index)=>{
        return(<FormRadio inline name ="placeDeposited"
          checked={this.state.selectedDeposit === value}
          onChange ={()=>this.changePlace(value)}
          
          >{value}</FormRadio>)
    })


    return (
      <div>
          {radios}
          
        
       
      </div>
    );
  }
}