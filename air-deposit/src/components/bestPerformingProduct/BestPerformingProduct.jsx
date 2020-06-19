import React, { PureComponent } from 'react';
import { Card, CardHeader, CardBody,  FormRadio } from 'shards-react'

import SemipolarLoading from "react-loadingg/lib/SemipolarLoading";

import { getExitsForProduct, getProductDetails, getEntriesForProduct } from '../../firebase/utils';


class BestPerformingProduct extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            selectedTypeOfOrder: "ascending"
        };
     
    }
   
    componentDidMount(){
        this.getProducts();
    }

    getProducts = async() =>{
        const productsWithAllDetails = await getProductDetails();
        var products =[];
        
        productsWithAllDetails.forEach(prod =>{
            
            let obj = {};
            for(let k in prod){    
                if(k === "name"){            
                    obj[k] = prod[k];
                    obj["documentId"] = prod["documentId"];
                    obj["performance"] = 0;
                    products.push(obj);
                }
            }
        })
      
         products.forEach(prod =>{
             prod["entries"] = new Map();  
             prod["exits"] = [];
         })
       
         this.getEntries(products)
    }

    getEntries = async(products) =>{
  
        for(let product of products){       
            const entriesForProduct = await getEntriesForProduct(product.documentId);       
            entriesForProduct.forEach(entry =>{      
                product["entries"].set(entry.entryDate.toDate(), entry.productsEntered)
            })

        }

        this.getExits(products)    
    }

    getExits = async(products)=>{
        
        for(let product of products){ 
            const exitsForProduct = await getExitsForProduct(product.documentId);   
            exitsForProduct.forEach(exit =>{
                product["exits"].push(exit.exitDate.toDate());
            })
            product["exits"].sort((a,b)=>{
                if (a > b) return 1;
                if (a < b) return -1;
                return 0;
            })
        }
        
        this.calculatePerformance(products);
    }

    calculatePerformance = (products) =>{
            
        for(let product of products){
            var i = 0;
            var sum = 0;
            try{
                product.entries.forEach((value, key) =>{ 
                    var storedProducts = value;
                    while(storedProducts > 0 ){     
                        var daysDifference =this.dateDiffInDays(product.exits[i],key);       
                        storedProducts--;
                        i++; 
                        sum += daysDifference;
                        if(i===product.exits.length) break;
                        
                    }
                    
                    if(i === product.exits.length){      
                        let diff = this.dateDiffInDays(new Date(2020,5,25), product.exits[product.exits.length - 1] )
                        sum += diff;
                        throw "break";
                    }

                })
        }catch(e){
            
            product.performance = sum/product.exits.length;
        }
            
        }   

        products = this.sortData(products, "ascending");
        this.setState({products: products})     
    }

    changeData = (option)=>{
        let data = this.state.products;
        console.log(data, "====--", option)
        this.sortData(data, option);
        this.setState({selectedTypeOfOrder:option, data: data})
    }

    sortData = (items, option) =>{
        console.log(items, "====--", option)
        if(option === "ascending"){
            items.sort((a,b)=>{
        
                if (a.performance > b.performance) return 1;
                if (a.performance < b.performance) return -1;
                return 0;
            })
        }else{
            items.sort((a,b)=>{
        
                if (a.performance > b.performance) return -1;
                if (a.performance < b.performance) return 1;
                return 0;
            })
        }

        return items;
    }

    dateDiffInDays(a, b) {
        let _MS_PER_DAY = 1000 * 60 * 60 * 24;
     
      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    
      return Math.floor((utc1 - utc2) / _MS_PER_DAY);
    }

    render() {
        
        let performanceOfProducts = [];  
        this.state.products.forEach((value,index)=>{
            performanceOfProducts.push(
                <div key={index} >
                    <div className="flex justify-around">
                        <h5>Name: <span> {value.name}</span> </h5> 
                        <h5>Performance:  <span> {value.performance}</span> </h5>
                    </div>
                    <hr/>
                </div>
            )
        })


        return (
            <div className = "w-40">
                <Card id="cardPerformance" style={{ zIndex: "2", marginTop: "20px" }} small>
                    <CardHeader>
                    <div className="flex justify-between ">
                        <h4>Product Performance: </h4>
                            <div className = "radioButtons">
                                <FormRadio
                                    inline
                                    checked={this.state.selectedTypeOfOrder === "ascending"}
                                    onChange={() => {
                                        this.changeData("ascending");
                                    }}
                                > 
                                    Ascending
                                </FormRadio>
                                <FormRadio
                                    inline
                                    checked={this.state.selectedTypeOfOrder === "decending"}
                                    onChange={() => {
                                        this.changeData("decending");
                                    }}
                                >
                                    Descending
                                </FormRadio>
                            </div>
                       
                       </div>
                    </CardHeader>

                    <CardBody>
                        {performanceOfProducts.length===0 ?   
                            <div className = "mt-5">
                                <SemipolarLoading speed = {"0.7"}size={"large"} color={"#000"}>

                                </SemipolarLoading>
                            </div> 
                            : 
                            performanceOfProducts}
                    </CardBody>
                    
                </Card>
            </div>

        );
    }
}



export default BestPerformingProduct;
