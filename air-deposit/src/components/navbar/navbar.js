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

// ({onChange, onSignIn})
class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      btn1 : false,
      btn2 : false,
      btn3 : false
    };
  }
  
  active = "btn_prod btn btn-info btn-lg active";
  inactive = "btn_prod btn btn-info btn-lg"

  changeActiveButton = (event) => {
    
      this.setState({[`btn${event.target.id}`]:true});
  };

  changeActiveButton = (e)=>{
    console.log(e.target.id)
    for(let i = 1; i <4; i++){
      if(e.target.id == i){
       
        e.target.setAttribute("class", this.active);
       
      }else
        document.getElementById(i+"").setAttribute("class", this.inactive)
    }
    
  }

  render() {
    
    return (
      <nav className="bg-white flex justify-between bb b--black-10 mt3 pb3">
        <div className="empty"></div>
        <div className="nav__buttons" className="ml3">
          <Link to="products">
            <Button
              style={buttonFirstStyle}
              
              id="1"
              size="lg"
              theme="info"
              onClick = {(e)=>this.changeActiveButton(e)}
              className="btn_prod">Products
            </Button>
          </Link>
          <Link to="employees">
            <Button
              style={{ borderRadius: "0" }}
              id="2"
            
              size="lg"
              theme="info"
              onClick = {(e)=>this.changeActiveButton(e)}
              className="btn_empl">Employees
            </Button>
          </Link>
          <Link to="statistics">
            <Button
              style={buttonSecondStyle}
              id="3"
             
              size="lg"
              onClick = {(e)=>this.changeActiveButton(e)}
              theme="info"
              className="btn_stat">Statistics
            </Button>
          </Link>
        </div>

        <div className="nav__log-out">
          <Button
            onClick={() => this.props.onSignIn("signin")}
            size="lg"
            theme="danger"
            className="mr3"
          >
            LOG OUT
          </Button>
        </div>
      </nav>
    );
  }

  
}
export default NavBar;
