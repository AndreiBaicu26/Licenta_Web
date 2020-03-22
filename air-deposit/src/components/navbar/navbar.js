import React from "react";
import 'tachyons';
import {Link} from 'react-router-dom';

const NavBar = ({onRouteChange}) => {
  return (
    <nav className="bg-white flex bb b--black-10">
        <div className=" pa3 flex-grow-1 items-end ">
        <Link to = 'products'>       
         <button className="f4 b--silver link dim br-pill ba bw1 ph3 pv2 mb2 mr4 dib black" 
            href='products'
            type = 'button'
            onClick = {onRouteChange('products')}>Products</button>
          </Link>
        <Link to ='employees'>  
         <button className="f4 b--silver link dim br-pill ba bw1 ph3 pv2 mb2 mr4 dib black"
            href='employees'
            type = 'button'
            onClick = {()=>onRouteChange('employees')}>Employees</button>
          </Link>
          <Link to ='statistics'>  
         <button className="f4 b--silver link dim br-pill ba bw1 ph3 pv2 mb2 mr4 dib black"
            type = 'button'
            href='statistics'
            onClick = {()=>onRouteChange('statistics')}>Statistics</button>
            </Link>
        </div>
        <div className ="flex-grow-2 " >
         <a className="f4 link dim br-pill bw1 ph3 pv2 mt3 mb2 mr3 dib bg-red white" href="#0">Log Out</a>
        </div>
    </nav>

  );
};

export default NavBar;
