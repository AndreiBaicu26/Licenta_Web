import React from "react";
import 'tachyons';
import BarChartProductsSales from "../../components/barChart/BarChart";
import BestPerformingProduct from "../../components/bestPerformingProduct/BestPerformingProduct"
import AllTimeSalesChart from "../../components/allTimeSalesChart/AllTimeSalesChart"
import "./statistics.css"





class StatisticsDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       
        sales :[],
       
    };
 
}

  getSales = (sales) =>{
    this.setState({sales: sales})
  }

  render(){
    
  return (
   <div className=" w-100 h-100 bg-blue"
   style = {{zIndex: "0", overflowX: "hidden"}}>
      <h2 className="mb-0">Statistics</h2> 
      <section className="barchart">
          <div className =" mt-0 vh-80">
          
            <BarChartProductsSales getSales ={this.getSales}/>
            
          </div>
       </section>
       <section className ="performance ">
          <div className="flex justify-around vh-80 mb-3 ">
                <BestPerformingProduct/>
                <AllTimeSalesChart sales = {this.state.sales}/>
            </div>
      </section>
   </div>
 
  );
  }
};

export default StatisticsDashboard;
