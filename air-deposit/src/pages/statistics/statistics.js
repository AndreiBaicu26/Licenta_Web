import React from "react";
import 'tachyons';
import BarChartProductsSales from "../../components/barChart/BarChart";
import "./statistics.css"

const StatisticsDashboard = () => {
  return (
   <div className=" w-100 h-100 bg-blue"
   style = {{zIndex: "0", overflowX: "hidden"}}>
      <h2 className="mb-0">Statistics</h2> 
    <div className =" mt-0 vh-100">
     
       <BarChartProductsSales/>
       
   </div>
   </div>
 
  );
};

export default StatisticsDashboard;
