

class Product {
    documentId;
    name ="";
    noOfPlayers;
    price;
    foh;
    boh;
    size;
    placesDeposited=[];

    constructor(name, noOfPlayers, price, foh, boh, size, documentId){
        
        this.name = name;
        this.noOfPlayers=noOfPlayers;
        this.price = price;
        this.foh = foh;
        this.boh = boh;
        this.documentId = documentId;
        
        switch(size){
            case "small":
                this.size = "small";break;
            case 'medium':
                this.size = "medium";break;
            case 'large':
                this.size = "large";break;
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

    setDocumentId(id){
        this.documentId = id;
    }

}

export default Product;