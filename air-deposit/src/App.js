import React from "react";
import "./App.css";
//import firebase from "firebase";
import 'tachyons';
import NavBar from './components/navbar/navbar';
import {Link, Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import ProductsDashboard from './components/products/products';
import EmployeesDashboard from './components/employees/employees';
import StatisticsDashboard from './components/statistics/statistics'

const firebaseConfig = {
  apiKey: "AIzaSyBnd2CziUijN3RzZ9vVa32g4zMKiS8o9UU",
  authDomain: "air-deposit.firebaseapp.com",
  databaseURL: "https://air-deposit.firebaseio.com",
  projectId: "air-deposit",
  storageBucket: "air-deposit.appspot.com",
  messagingSenderId: "1057755749597",
  appId: "1:1057755749597:web:dfb39a8bb96dce1557cf34",
  measurementId: "G-TN2BQ0KC8C"
};

// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
// const firebaseProducts = db.collection("products");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route:'products'
    };
  }

  onRouteChange=(route)=>{
    
  }

  render() {
    console.log(this.state.route)
    return (
      <div className="App">
        <Router>
          <NavBar onRouteChange = {this.onRouteChange}/>
          <Switch>
         
          <Route exact path = '/statistics'>
             <StatisticsDashboard/>
        </Route>
        <Route exact path = '/products'>
            <ProductsDashboard/>
        </Route>

        <Route path = '/employees'>
            <EmployeesDashboard/>
        </Route>

        
        

          </Switch>
         </Router>
      </div>
    );
  }
}

export default App;
