import React from "react";
import 'tachyons';
import BarChartProductsSales from "../../components/barChart/BarChart";
import "./statistics.css"

const StatisticsDashboard = () => {
  return (
   <div className=" vw-100 vh-100 bg-blue">
      <h2 className="mb-0">Statistics</h2> 
    <div className =" mt-0 vh-100">
     
       <BarChartProductsSales/>
       
   </div>
   </div>
 
  );
};

export default StatisticsDashboard;
