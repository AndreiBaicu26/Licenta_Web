import React from "react";
import "./App.css";
//import firebase from "firebase";
import "tachyons";
import NavBar from "./components/navbar/navbar";
import { Switch, Route, Redirect, BrowserRouter as Router  } from "react-router-dom";
import ProductsDashboard from "./pages/products/products";
import EmployeesDashboard from "./pages/employees/employees";
import StatisticsDashboard from "./pages/statistics/statistics";
import Signin from "./components/signin/signin";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "tachyons";



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
    };
  }

  onSignIn = (route) => {
    this.setState({ route: route });
  };


  render() {
    if (this.state.route === "signin") {
      return <Signin onSignIn={this.onSignIn}></Signin>;
    } else
      
      return (
        <div className="App">
          <Router>
            <NavBar onChange={this.onChange} onSignIn={this.onSignIn} />
            <Switch>
              <Route exact path="/statistics">
                <StatisticsDashboard />
              </Route>
              <Route exact path="/products">
                <ProductsDashboard />
              </Route>
              <Route path="/employees">
                <EmployeesDashboard onSignIn={this.onSignIn} />
              </Route>
            </Switch>
          </Router>
        </div>
      );
  }
}

export default App;
