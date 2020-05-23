import React from "react";


import { FormRadio } from "shards-react";

export default class FohOrBohRadio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlace: "store"
    };

  }

  changePlace(place) {
      this.props.selectedPlace(place);
      this.setState({
        selectedPlace: place
    });
  }

  render() {
    return (
      <div>
      
          <FormRadio  
            id="store"
            inline
            name="place"
            checked={this.state.selectedPlace === "store"}
            onChange={() => {
              this.changePlace("store");
            }}
          >
           Store
          </FormRadio>

          <FormRadio
            inline
            name="place"
            checked={this.state.selectedPlace === "deposit"}
            onChange={() => {
              this.changePlace("deposit");
            }}
          >
            Deposit
          </FormRadio>
          
        
       
      </div>
    );
  }
}