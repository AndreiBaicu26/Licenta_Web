import React from "react";
import 'tachyons';
import BarChartProductsSales from "../../components/barChart/BarChart";
import BestPerformingProduct from "../../components/bestPerformingProduct/BestPerformingProduct"
import AllTimeSalesChart from "../../components/allTimeSalesChart/AllTimeSalesChart"
import "./statistics.css"





const StatisticsDashboard = () => {
  return (
   <div className=" w-100 h-100 bg-blue"
   style = {{zIndex: "0", overflowX: "hidden"}}>
      <h2 className="mb-0">Statistics</h2> 
      <section className="barchart">
          <div className =" mt-0 vh-80">
          
            <BarChartProductsSales/>
            
          </div>
       </section>
       <section className ="performance ">
          <div className="flex justify-around vh-80 mb-3 ">
                <BestPerformingProduct/>
                <AllTimeSalesChart/>
            </div>
      </section>
   </div>
 
  );
};

export default StatisticsDashboard;
