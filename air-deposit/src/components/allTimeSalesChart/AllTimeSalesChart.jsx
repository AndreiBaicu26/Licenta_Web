import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody, Button, FormRadio,FormSelect, CardFooter, timeoutsShape } from 'shards-react'

import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";

import {PieChart, Pie, Tooltip, Legend, Cell} from 'recharts'

class AllTimeSalesChart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          width:0,
          height:0,
          data:[]
        };
     
    }

    componentDidMount(){
        
        this.updateWindowDimensions();
        window.addEventListener('resize', () => this.updateWindowDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateWindowDimensions());
    }

    updateWindowDimensions() {
        
        if(document.getElementById("cardPie")!==null){
            const width = document.getElementById("cardPie").offsetWidth;
            const height = document.getElementById("cardPie").offsetHeight;
            this.setState({ width: width, height: height });
        }
    }

    getRandomColor() {
       
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
       
        return color;
    }

    mapData = () =>{
        
        const sales = this.props.sales;
        let statistics = [];
        var map = new Map();
       
        sales.forEach((value, index)=>{
        
            if(map.has(value.product.name)){
                map.set(value.product.name,map.get(value.product.name) + 1);

            }else{
                map.set(value.product.name,1);
            }
        })

        map.forEach((value, key)=>{
            let obj = {};
            obj["name"] = key;
            obj["value"] = value;
            statistics.push(obj)
        })

       this.setState({data: statistics})
    }

    render() {
        
        if(this.props.sales.length > 0 && this.state.data.length === 0 ){
            this.mapData();
        }
      
        return (
            <div className = "w-40" >
                <Card id="cardPie" style={{ zIndex: "2", marginTop: "20px" }} small>
                    <CardHeader>
                        <h4>All time products sold</h4>
                    </CardHeader>

                    <CardBody id="cardPieBody">
                        {
                            this.state.data.length===0 
                            ?   
                                <div className = "mt-5">
                                    <SemipolarLoading speed = {"0.7"}size={"large"} color={"#000"}/>
                                </div> 
                            : 
                                <PieChart width={this.state.width} height={300}>
                                    <Pie isAnimationActive={true} data={this.state.data} cx={this.state.width/2} cy={130} outerRadius={100} fill="#8884d8" label>
                                        {
                                            this.state.data.map((entry, index) => <Cell fill={this.getRandomColor()}/>)
                                        }
                                    </Pie>
                                    <Tooltip/>
                                    <Legend />
                                </PieChart>
                        }
  
                    </CardBody>
   
                </Card>
            </div>

        );
    }
}



export default AllTimeSalesChart;
