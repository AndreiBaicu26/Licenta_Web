import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody, FormRadio,FormSelect, CardFooter } from 'shards-react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";
import { getSales, getProducts } from '../../firebase/utils';


class BarChartProductsSales extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            data: [],
            selectedTypeOfChart: "revenue",
            sales :[],
       
            monthSelected:0
        };
     
    }
    selectedOption = 0;

    

   async componentDidMount() {
       
       await this.loadData();
       
       if(this.state.sales.length > 0){
          this.mapData(0);    
       }
        this.updateWindowDimensions();
       
        window.addEventListener('resize', () => this.updateWindowDimensions());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateWindowDimensions());
    }

    updateWindowDimensions() {
        if(document.getElementById("cardBar")!==null){
        const width = document.getElementById("cardBar").offsetWidth
      
        this.setState({ width: width, height: window.innerHeight });
        }
    }

    
    

    daysInMonth(month, year) {
        return new Date(year, month,0).getDate();
    }


    mapData = (monthSelected,option = "revenue") =>{
        var days = this.daysInMonth(monthSelected, 2020);
        var salesData = [];
        var dataToBeShown = [];
 
  
        var salesInSelectedMonth;
  
        salesInSelectedMonth = this.state.sales.filter(sale =>{
            
            return sale.dateCreated.toDate().getMonth() === parseInt(monthSelected)
        });
    
   
        for (let i = 0; i < days; i++) {

            dataToBeShown[i] = {};

            for(let y = 0; y < this.state.sales.length; y++){
                dataToBeShown[i][this.state.sales[y].product.name] = 0;
            }

            dataToBeShown[i]["day"] = i +1 ;
  
            salesData[i] = salesInSelectedMonth.filter(sale => sale.dateCreated.toDate().getDate() === i);

          
            if (salesData[i].length > 0) {
                var hashMap = new Map();
                var hashTotalItemsSold = new Map();
                for (let y = 0; y < salesData[i].length; y++) {
                    let prodName = salesData[i][y].product.name;
                    let prodPrice = salesData[i][y].product.price;
                    if (hashMap.has(prodName)) {
                        hashMap.set(prodName, hashMap.get(prodName) + prodPrice);
                        hashTotalItemsSold.set(prodName, hashTotalItemsSold.get(prodName) + 1);
                    } else {
                        hashMap.set(prodName, prodPrice);
                        hashTotalItemsSold.set(prodName, 1);
                    }

                }


                salesData[i] = {};

                if(option === 'revenue'){
                    hashMap.forEach((value, key, map) => {
                        dataToBeShown[i][key] = value;
    
                    })
                }else{
                    hashTotalItemsSold.forEach((value, key, map) => {
                        dataToBeShown[i][key] = value;
    
                    })
                }
              
            }



        }
        
        this.setState({ data: dataToBeShown })
        

    }

    loadData = async () => {
        const month = this.getOptionSelected();
        
        
        const sal = await getSales(month);
        this.props.getSales(sal);
         this.setState({ sales:sal})
     

    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    changeData = (option) => {

        this.mapData(this.selectedOption,option)
        this.setState({
            selectedTypeOfChart: option
        });
    }

    
    getOptionSelected = ()=>{
        
        var select = document.getElementById("formSelect");
        var optionSelected = select.options[select.selectedIndex].value;
        this.selectedOption = optionSelected;
        this.mapData(optionSelected,this.state.selectedTypeOfChart);
    }   

    getBestSellingProduct = () =>{
       
        var map = new Map();
         for(let i = 0; i <  this.state.data.length; i++){
        
            for(let a in this.state.data[i]){
                if(a !== "day"){
                    if (map.has(a)) {
                        map.set(a,map.get(a) + this.state.data[i][a]);
                       
                    } else {
                        map.set(a, this.state.data[i][a]);
                    }
                }
            }
        }
        
        let keys = Array.from( map.values() )

        var max = Math.max(...keys)

       
        for(const y of map.entries()){

            if(y[1] === max){
               return y[0];
            }
           
        }


        
    }

    render() {
        
        var bars = [];
        if (this.state.data.length !== 0) {
            Object.keys(this.state.data[0]).forEach((value, index, arr) => {
                if (value !== "day") {
                    bars.push(<Bar dataKey={value} stackId="a" fill={this.getRandomColor()} key={index} />)
                }
            })
        }


        return (
            <div >
                <Card id="cardBar" style={{ zIndex: "2", marginTop: "20px", maxWidth: "80%", marginLeft: "10%" }} small>
                    <CardHeader>
                        <div className="flex justify-between ">
                            <div className = "radioButtons">
                            <FormRadio
                                inline
                                checked={this.state.selectedTypeOfChart === "revenue"}
                                onChange={() => {
                                    this.changeData("revenue");
                                }}
                            > 
                                Revenue
                            </FormRadio>
                            <FormRadio
                                inline
                                checked={this.state.selectedTypeOfChart === "productsSold"}
                                onChange={() => {
                                    this.changeData("productsSold");
                                }}
                            >
                                Products Sold
                            </FormRadio>
                            </div>
                            <div className ="dropDown">
                            <FormSelect onChange={()=>this.getOptionSelected()} id ={"formSelect"} style = {{flex:"2"}}>
                                   
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                  
                                    </FormSelect>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div>
                        {bars.length === 0? 
                            <div className = "mt-5 mb-2">
                            <SemipolarLoading speed = {"0.7"}size={"large"} color={"#000"}></SemipolarLoading>
                            </div>
                                :
                            <BarChart
                                width={this.state.width}
                                height={400}
                                data={this.state.data}
                                margin={{
                                    top: 20, right: 60, left: 40, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />



                                {bars}
                            </BarChart>
                        }
                        </div>
                    </CardBody>
                    <CardFooter>
                        {this.state.selectedTypeOfChart === "revenue" ? (<h4>Most earnings came from: <span> {this.getBestSellingProduct()} </span></h4>) :
                        <h4>Most units sold:<span> {this.getBestSellingProduct()} </span></h4> }
                    </CardFooter>

                </Card>
            </div>

        );
    }
}



export default BarChartProductsSales;
