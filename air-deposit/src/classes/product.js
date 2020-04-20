

class Product {

    name ="";
    noOfPlayers;
    price;
    foh;
    boh;
    size;
    placesDeposited=[];

    constructor(name, noOfPlayers, price, foh, boh, size){
        
        this.name = name;
        this.noOfPlayers=noOfPlayers;
        this.price = price;
        this.foh = foh;
        this.boh = boh;
        
        switch(size){
            case "small":
                this.size = "small";break;
            case 'medium':
                this.size = "medium";break;
            case 'big':
                this.size = "big";break;
            default:
                throw Error(`Invalid property ${size}`);
        }
    
    }


    addDeposit(depositId){
        this.placesDeposited.push(depositId);
    }


    removeDeposit(depositId){
        let item = this.placesDeposited.find(elem => elem === depositId);
        let index = this.placesDeposited.indexOf(item);
        this.placesDeposited.splice(index,1);
    }



}

export default Product;