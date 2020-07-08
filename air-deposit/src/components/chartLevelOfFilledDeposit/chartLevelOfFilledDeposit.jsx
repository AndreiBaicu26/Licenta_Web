import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend} from 'recharts';
import { Card, CardHeader, CardBody} from 'shards-react'
import { getAllStorages } from '../../firebase/utils';
import { faPercentage } from '@fortawesome/free-solid-svg-icons';
import { commonStyle } from 'react-loadingg/lib/utils/style';



class ChartLevelOfFilledDeposit extends React.Component {


    constructor(){
        super();
        this.state ={
            storages: [],
            data:{
                name:"",
                occupied:0,
                total:0
            }
        }
    }

    async componentDidMount(){
        const stor = getAllStorages();
        stor.then(data=>{
            this.setState({storages: [...data]})
        })
       
    }
    

    mapData = () =>{
        
        let totalPercentage = this.calculatePercentageForStorage();
       
       

        const finalPercentage =  ((totalPercentage / (this.state.storages.length * 100))*100).toFixed(2);

        this.setState({data:{name:"Deposit", occupied:finalPercentage,total:100}})
    }

  
    calculatePercentageForStorage = ()=>{
        let percentage = 0;
        this.state.storages.forEach(storage =>{     
            if(storage.storageID !== "Processing"){
                let totalProducts = storage.maxBig+ storage.maxSmall + storage.maxMedium;
                percentage += 100-((totalProducts) * 100)/70;
            }else{
                let totalProducts = storage.maxBig+ storage.maxSmall + storage.maxMedium;
                percentage += 100-((totalProducts) * 100)/140;
            }
        })
        return percentage;
    }

  

    render () {

       if(this.state.storages.length !== 0 && this.state.data.total ==0){
           this.mapData();
       }    
       let data = [{...this.state.data}];
      
        return (

            <div className="w-20">
                <Card id="cardPerformance" style={{ zIndex: "2", marginTop: "20px" }} small>
                    <CardHeader>
                   
                        <h4>Capacity of deposit</h4>
                      
                    </CardHeader>

                    <CardBody>
                         <BarChart width={300} height={300} data={data}  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis dataKey = "total"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="occupied" fill="#d50102" minPointSize={2} background={{ fill: '#b3e7dc' }}>
                                <LabelList  />
                            </Bar>
                        
                        </BarChart>
                    </CardBody>
                    
                </Card>
            </div>
        )
    }
}

export default ChartLevelOfFilledDeposit
