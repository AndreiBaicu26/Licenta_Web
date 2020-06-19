import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody, Button, FormRadio,FormSelect, CardFooter } from 'shards-react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { getSales, getProducts } from '../../firebase/utils';



const data = [
   
];


class AllTimeSalesChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          
        };
     
    }
   

    render() {
        
      

        return (
            <div className = "w-40" >
                <Card id="cardBar" style={{ zIndex: "2", marginTop: "20px" }} small>
                    <CardHeader>
                       <h4>Best performing product</h4>
                    </CardHeader>

                    <CardBody>
                      
                    </CardBody>
                    
                </Card>
            </div>

        );
    }
}



export default AllTimeSalesChart;
