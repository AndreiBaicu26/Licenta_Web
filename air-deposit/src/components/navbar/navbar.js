import React from "react";
import "tachyons";
import { Link} from "react-router-dom";
import { Button} from "shards-react";

const buttonFirstStyle = {
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0",
};

const buttonSecondStyle = {
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
};

const middleButtonStyle ={
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  borderTopRightRadius: "0",
  borderBottomRightRadius: "0"
}

// ({onChange, onSignIn})
const initState  = {
  btn0 : false,
  btn1 : false,
  btn2 : false,
  btn3 : false
}
class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      btn0 : false,
      btn1 : false,
      btn2 : false,
      btn3 : false
    };
  }
  
  active = " btn btn-info btn-lg active";
  inactive = " btn btn-info btn-lg"

  changeActiveButton = (event) => {
     this.setState(initState)
      this.setState({[`btn${event.target.id}`]:true});
  };


  render() {
    
    return (
      <nav className="bg-white flex justify-between bb b--black-10 mt3 pb3">
        <div className="empty"></div>
        <div className="nav__buttons" className="ml3">
        <Link to="providers">
            <Button
              style={buttonFirstStyle}  
              active = {this.state.btn0}
              id="0"
              size="lg"
              theme="info"
              onClick = {(e)=>this.changeActiveButton(e)}
              className="btn_prov">Providers
            </Button>
          </Link>
          <Link to="products">
            <Button
              style={middleButtonStyle}
              active = {this.state.btn1}
              id="1"
              size="lg"
              theme="info"
              onClick = {(e)=>this.changeActiveButton(e)}
              className="btn_prod">Products
            </Button>
          </Link>
          <Link to="employees">
            <Button
              style={middleButtonStyle}
              id="2"
              active = {this.state.btn2}
              size="lg"
              theme="info"
              onClick = {(e)=>this.changeActiveButton(e)}
              className="btn_empl">Employees
            </Button>
          </Link>
          <Link to="statistics">
            <Button
              style={buttonSecondStyle}
              active = {this.state.btn3}
              id="3"     
              size="lg"
              onClick = {(e)=>this.changeActiveButton(e)}
              theme="info"
              className="btn_stat">Statistics
            </Button>
          </Link>
        </div>

        <div className="nav__log-out">
        <Link to ="/">
          <Button
            onClick={() => this.props.onSignIn("signin")}
            size="lg"
            theme="danger"
            className="mr3"
          >
            LOG OUT
          </Button>
          </Link>
        </div>
      </nav>
    );
  }

  
}
export default NavBar;
